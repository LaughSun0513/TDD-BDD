export const findWrapper = (wrapper, tag) => {
	return wrapper.findAll(`[data-test=${tag}]`);
};
