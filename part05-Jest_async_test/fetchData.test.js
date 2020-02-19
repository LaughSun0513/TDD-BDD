import { fetchData, fetchPromise, fetchError } from './fetchData';

/*
测试异步请求出现的问题:
当修改接口时，jest --watch 始终为通过，原因是没有进入fetchData内部的fn回调函数

test('fetchData 返回结果为 {success:true}', () => {
	fetchData((data) => {
		expect(data).toEqual({
			success: true
		})
	})
})
*/

// 写法一 回调函数--添加done
test('fetchData 返回结果为 {success:true}', (done) => {
	fetchData((data) => {
		expect(data).toEqual({
			success: true
		});
		done();
	})
});
//--------------------fetchPromise--------------------------------
// 测试Promise -- then
test('fetchPromise 返回结果为 {success:true}', () => {
	return fetchPromise().then((res) => {
		expect(res.data).toEqual({
			success: true
		})
	})
});
//写法二
test('fetchPromise 返回结果为 {success:true} 写法二', () => {
	return expect(fetchPromise()).resolves.toMatchObject({
		data: {
			success: true
		}
	});
})
//写法三 async/await
test('fetchPromise 返回结果为 {success:true} 写法三 async/await', async () => {
	await expect(fetchPromise()).resolves.toMatchObject({
		data: {
			success: true
		}
	});
});
//写法四
test('fetchPromise 返回结果为 {success:true} 写法四 async/await获取结果', async () => {
	const res = await fetchPromise();
	expect(res.data).toEqual({
		success: true
	})
});
//--------------------fetchError--------------------------------
// 测试Promise Error-- catch
test('fetchError 返回结果为404', () => {
	expect.assertions(1); // 必须要执行一次expect ，可以规避不进入catch函数的情况
	return fetchError().catch((e) => {
		expect(e.toString().indexOf('404') > -1).toBe(true);
	})
});
//写法二
test('fetchError 返回结果为404 toThrow方法', () => {
	return expect(fetchError()).rejects.toThrow();
});

//写法三 async/await
test('fetchError 返回结果为404 toThrow方法 写法三 async/await', async () => {
	await expect(fetchError()).rejects.toThrow();
});

//写法四 try/catch
test('fetchError 返回结果为404 toThrow方法 写法四 try/catch', async () => {
	expect.assertions(1); // 必须要执行一次expect ，可以规避接口正常进入try的情况
	try {
		await fetchError();
	} catch (e) {
		expect(e.toString()).toEqual('Error: Request failed with status code 404');;
	}
});