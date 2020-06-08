
const mockData = {
    data: [
        {
            status: 'div',
            value: 'value from api'
        }
    ],
    success: true
}

const mockData2 = {
    data: [{
        status: 'div',
        value: 'value from api after 4s'
    }],
    success: true
}
export default {
    get(url) { 
        if (url === '/undoList.json') {
            return new Promise((resolve, reject) => {
                if (this.success) { 
                    resolve(mockData)
                } else {
                    reject(new Error('axios error'));
                }
            });
        }
        else if (url === '/undoList2.json') {
            return new Promise((resolve, reject) => {
                resolve(mockData2)
            });
        }
    }
}