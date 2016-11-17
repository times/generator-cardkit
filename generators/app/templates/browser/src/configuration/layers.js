module.exports = {
  title: {
    name: 'Title',
    type: 'text',
    x: 30,
    y: 30,
    fill: '#FFFFFF',
    text: 'This is some sample text that you can change',
    fontSize: 24,
    get lineHeight() {
      return this.fontSize * 1.2;
    },
    editable: {
      text: true,
      fill: 'picker',
      fontSize: {
        min: 10,
        max: 30,
        step: 2
      }
    }
  },
};