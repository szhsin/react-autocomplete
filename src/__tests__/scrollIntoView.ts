const scrollIntoView = jest.fn();
Element.prototype.scrollIntoView = scrollIntoView;

export { scrollIntoView };
