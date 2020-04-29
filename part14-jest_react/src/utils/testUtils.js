export const findWrapper = (wrapper, tag) => {
    return wrapper.find(`[data-test="${tag}"]`);
};
