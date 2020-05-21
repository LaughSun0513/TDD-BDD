const initUndoList = {
	success: true,
	data: [
		{
			status: 'div',
			value: 'Yux'
		},
		{
			status: 'div',
			value: 'Yux'
		},
		{
			status: 'div',
			value: 'Yux'
		}
	]
};
const initUndoList2 = {
	success: true,
	data: [
		{
			status: 'div',
			value: 'Yux'
		}
	]
};
export default {
	get(url) {
		return new Promise((resolve, reject) => {
			if (url === '/getData.json' && this.success) {
				resolve(initUndoList);
      }
      else if (url === '/getData2.json' && this.success) {
				resolve(initUndoList2);
      }
      else {
				reject(new Error());
			}
		});
	}
};
