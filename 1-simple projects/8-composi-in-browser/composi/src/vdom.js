import { RECYCLED_NODE, TEXT_NODE, EMPTY_OBJECT, LIFECYCLE } from './constants'
import { createTextVNode, createVNode } from './vnode'

export function mergeObjects(a, b) {
  return Object.assign({}, a, b)
}

function listener(event) {
  this.handlers[event.type](event)
}
/**
 * Update the properties and attributes of a VNode based on new data.
 * @param {Element} node
 * @param {string} key
 * @param {any} oldValue
 * @param {any} newValue
 * @param {boolean} isSVG
 * @return {void} undefined
 */
function patchProperty(node, key, oldValue, newValue, isSVG) {
  if (key === 'key') {
  } else if (key === 'style' && typeof newValue === 'object') {
    for (let i in mergeObjects(oldValue, newValue)) {
      const style = newValue == null || newValue[i] == null ? '' : newValue[i]
      if (i[0] === '-') {
        node[key].setProperty(i, style)
      } else {
        node[key][i] = style
      }
    }
  } else if (key[0] === 'o' && key[1] === 'n') {
    if (
      !((node['handlers'] || (node['handlers'] = {}))[
        (key = key.slice(2).toLowerCase())
      ] = newValue)
    ) {
      node.removeEventListener(key, listener)
    } else if (!oldValue) {
      node.addEventListener(key, listener)
    }
  } else if (!isSVG && key !== 'list' && key in node) {
    node[key] = newValue == null ? '' : newValue
  } else if (newValue == null || newValue === false) {
    node.removeAttribute(key)
  } else {
    node.setAttribute(key, newValue)
  }
}

function createNode(vnode, LIFECYCLE, isSVG) {
  const node =
    vnode.flag === TEXT_NODE
      ? document.createTextNode(vnode.type)
      : (isSVG = isSVG || vnode.type === 'svg')
      ? document.createElementNS('http://www.w3.org/2000/svg', vnode.type)
      : document.createElement(vnode.type)
  const props = vnode.props
  if (props.onmount) {
    LIFECYCLE.push(function() {
      props.onmount(node)
    })
  }

  for (let k in props) {
    patchProperty(node, k, null, props[k], isSVG)
  }

  for (let i = 0, len = vnode.children.length; i < len; i++) {
    node.appendChild(createNode(vnode.children[i], LIFECYCLE, isSVG))
  }

  return (vnode.node = node)
}

function getKey(vnode) {
  return vnode == null ? null : vnode.key
}

function removeChildren(vnode) {
  for (let i = 0, length = vnode.children.length; i < length; i++) {
    removeChildren(vnode.children[i])
  }

  const cb = vnode.props.ondestroy
  if (cb != null) {
    cb(vnode.node)
  }

  return vnode.node
}

function removeElement(parent, vnode) {
  const remove = function() {
    parent.removeChild(removeChildren(vnode))
  }

  const cb = vnode.props && vnode.props.onunmount
  if (cb != null) {
    cb(vnode.node, remove)
  } else {
    remove()
  }
}

function patchNode(parent, node, oldVNode, newVNode, isSVG) {
  if (oldVNode === newVNode) {
  } else if (
    oldVNode != null &&
    oldVNode.flag === TEXT_NODE &&
    newVNode.flag === TEXT_NODE
  ) {
    if (oldVNode.type !== newVNode.type) {
      node.nodeValue = newVNode.type
    }
  } else if (oldVNode == null || oldVNode.type !== newVNode.type) {
    node = parent.insertBefore(createNode(newVNode, LIFECYCLE, isSVG), node)
    if (oldVNode != null) {
      // parent.removeChild(oldVNode.node)
      removeElement(parent, oldVNode)
    }
  } else {
    let tmpVKid
    let oldVKid

    let oldKey
    let newKey

    const oldVProps = oldVNode.props
    const newVProps = newVNode.props

    const oldVKids = oldVNode.children
    const newVKids = newVNode.children

    let oldHead = 0
    let newHead = 0
    let oldTail = oldVKids.length - 1
    let newTail = newVKids.length - 1

    isSVG = isSVG || newVNode.type === 'svg'

    for (let i in mergeObjects(oldVProps, newVProps)) {
      if (
        (i === 'value' || i === 'selected' || i === 'checked'
          ? node[i]
          : oldVProps[i]) !== newVProps[i]
      ) {
        patchProperty(node, i, oldVProps[i], newVProps[i], isSVG)
        const cb = newVProps.onupdate
        if (cb != null) {
          LIFECYCLE.push(function() {
            cb(node, oldVProps, newVProps)
          })
        }
      }
    }

    while (newHead <= newTail && oldHead <= oldTail) {
      if (
        (oldKey = getKey(oldVKids[oldHead])) == null ||
        oldKey !== getKey(newVKids[newHead])
      ) {
        break
      }

      patchNode(
        node,
        oldVKids[oldHead].node,
        oldVKids[oldHead++],
        newVKids[newHead++],
        isSVG
      )
    }

    while (newHead <= newTail && oldHead <= oldTail) {
      if (
        (oldKey = getKey(oldVKids[oldTail])) == null ||
        oldKey !== getKey(newVKids[newTail])
      ) {
        break
      }

      patchNode(
        node,
        oldVKids[oldTail].node,
        oldVKids[oldTail--],
        newVKids[newTail--],
        isSVG
      )
    }

    if (oldHead > oldTail) {
      while (newHead <= newTail) {
        node.insertBefore(
          createNode(newVKids[newHead++], LIFECYCLE, isSVG),
          (oldVKid = oldVKids[oldHead]) && oldVKid.node
        )
      }
    } else if (newHead > newTail) {
      while (oldHead <= oldTail) {
        // node.removeChild(oldVKids[oldHead++].node)
        removeElement(node, oldVKids[oldHead++])
      }
    } else {
      let i, keyed, newKeyed
      for (i = oldHead, keyed = {}, newKeyed = {}; i <= oldTail; i++) {
        if ((oldKey = oldVKids[i].key) != null) {
          keyed[oldKey] = oldVKids[i]
        }
      }

      while (newHead <= newTail) {
        oldKey = getKey((oldVKid = oldVKids[oldHead]))
        newKey = getKey(newVKids[newHead])

        if (
          newKeyed[oldKey] ||
          (newKey != null && newKey === getKey(oldVKids[oldHead + 1]))
        ) {
          if (oldKey == null) {
            // node.removeChild(oldVKid.node)
            removeElement(node, oldVKid)
          }
          oldHead++
          continue
        }

        if (newKey == null || oldVNode.flag === RECYCLED_NODE) {
          if (oldKey == null) {
            patchNode(
              node,
              oldVKid && oldVKid.node,
              oldVKid,
              newVKids[newHead],
              isSVG
            )
            newHead++
          }
          oldHead++
        } else {
          if (oldKey === newKey) {
            patchNode(node, oldVKid.node, oldVKid, newVKids[newHead], isSVG)
            newKeyed[newKey] = true
            oldHead++
          } else {
            if ((tmpVKid = keyed[newKey]) != null) {
              patchNode(
                node,
                node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node),
                tmpVKid,
                newVKids[newHead],
                isSVG
              )
              newKeyed[newKey] = true
            } else {
              patchNode(
                node,
                oldVKid && oldVKid.node,
                null,
                newVKids[newHead],
                isSVG
              )
            }
          }
          newHead++
        }
      }

      while (oldHead <= oldTail) {
        if (getKey((oldVKid = oldVKids[oldHead++])) == null) {
          // node.removeChild(oldVKid.node)
          removeElement(node, oldVKid)
        }
      }

      for (let i in keyed) {
        if (newKeyed[i] == null) {
          // node.removeChild(keyed[i].node)
          removeElement(node, keyed[i])
        }
      }
    }
  }

  return (newVNode.node = node)
}

function recycleNode(node) {
  return node.nodeType === TEXT_NODE
    ? createTextVNode(node.nodeValue, node)
    : createVNode(
        node.nodeName.toLowerCase(),
        EMPTY_OBJECT,
        Array.prototype.map.call(node.childNodes, recycleNode),
        node,
        null,
        RECYCLED_NODE
      )
}

export function patch(node, vdom) {
  const vnode = (patchNode(
    node.parentNode,
    node,
    node.vdom || recycleNode(node),
    vdom
  ).vdom = vdom)
  while (LIFECYCLE.length > 0) LIFECYCLE.pop()()
  return vnode
}
