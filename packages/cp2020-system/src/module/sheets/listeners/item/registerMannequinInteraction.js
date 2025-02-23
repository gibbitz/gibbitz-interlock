export const registerMannequinInteraction = (html) => (handlers) => {
  const eventNames = Object.keys(handlers)
  const activeHandlers = eventNames.forEach((eventName) => {
    html.querySelector('.mannequin > svg').addEventListener(
      eventName, (event) => {
        const {target: { id, classname, dataset }} = event
        handlers[eventName]({ id, classname, dataset }, event)
      }
    )
  })
}