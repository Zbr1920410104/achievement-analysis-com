import * as DominConfigs from '../constants/domin-constants';
<<<<<<< HEAD
import * as APIs from '../constants/api-constants';
=======
// import * as APIs from '../constants/api-constants';
>>>>>>> 6097761b9ef750d8c2736bf86d90088a87bab8b7
import moment from 'moment';
import { message } from 'antd';

// 请求包装
<<<<<<< HEAD
export async function launchRequest(
	url,
	params = {},
	requestType = DominConfigs.REQUEST_TYPE.POST,
	ignoreParam = false
) {
	// headers
	const t = moment().format('Unix Timestamp');
	const os = 'opt';

	let headers = new Headers({
		Accept: '*/*',
		'Content-Type': 'application/json',
		Connection: 'keep-alive',
		t,
		os,
		authorization: `Bearer ${localStorage.getItem('token')}`
	});

	const fetchParams = {
		method: requestType,
		headers
	};

	// 根据不同的请求类型 拼装请求参数
	if (requestType === DominConfigs.REQUEST_TYPE.POST) {
		fetchParams.body = JSON.stringify(params);
	} else if (requestType === DominConfigs.REQUEST_TYPE.GET) {
		if (!ignoreParam) {
			const allKey = Object.keys(params);
			if (allKey && allKey.length > 0) {
				if (url.indexOf('?') === -1) {
					url = `${url}?`;
				} else {
					if (url.indexOf('=') !== -1) {
						url = url + '&';
					}
				}

				let query = '';
				for (let i = 0; i < allKey.length; i += 1) {
					query = `${query + allKey[i]}=${params[allKey[i]]}`;
					if (i !== allKey.length - 1) {
						query = `${query}&`;
					}
				}

				url = url + query;
			}
		}
	} else if (requestType === DominConfigs.REQUEST_TYPE.PUT) {
		fetchParams.body = JSON.stringify(params);
	}

	// 进行请求
	return await _fetch(url, params, requestType, fetchParams);
}
=======
export default (
  url,
  params = {},
  requestType = 'post',
  ignoreParam = false
) => {
  // headers
  const t = moment().format('Unix Timestamp');
  const os = 'opt';

  let headers = new Headers({
    Accept: '*/*',
    'Content-Type': 'application/json',
    Connection: 'keep-alive',
    t,
    os,
    authorization: `Bearer ${localStorage.getItem('token')}`
  });

  const fetchParams = {
    method: requestType,
    headers
  };

  // 根据不同的请求类型 拼装请求参数
  if (requestType === 'POST') {
    fetchParams.body = JSON.stringify(params);
  } else if (requestType === 'GET') {
    if (!ignoreParam) {
      const allKey = Object.keys(params);

      if (allKey && allKey.length > 0) {
        if (url.indexOf('?') === -1) {
          url = `${url}?`;
        } else {
          if (url.indexOf('=') !== -1) {
            url = url + '&';
          }
        }

        let query = '';
        for (let i = 0; i < allKey.length; i += 1) {
          query = `${query + allKey[i]}=${params[allKey[i]]}`;
          if (i !== allKey.length - 1) {
            query = `${query}&`;
          }
        }

        url = url + query;
      }
    }
  } else if (requestType === 'PUT') {
    fetchParams.body = JSON.stringify(params);
  }

  // 进行请求
  return _fetch(url, params, requestType, fetchParams);
};
>>>>>>> 6097761b9ef750d8c2736bf86d90088a87bab8b7

/**
 * 上传项目作品照片到七牛
 *
 * result: {
 *      url: 照片展示url
 *      key: 上传用key
 * }
 *
 * @param imagePath 照片路径
 * @param success
 * @param failed
 * @returns {function(*)}
 */
<<<<<<< HEAD
export function uploadProjectImageToQiniu(image) {
	return new Promise(async (resolve, reject) => {
		const formdata = new FormData();
		let fetchParams = {},
			responseData = {};

		// 获取上传token
		let tokenResponse = await launchRequest(APIs.GetUploadToken, {
			fileType: image.type
		});

		formdata.append('key', tokenResponse.key);
		formdata.append('token', tokenResponse.token);
		formdata.append('file', image);

		fetchParams = {
			method: DominConfigs.REQUEST_TYPE.POST,
			body: formdata
		};

		responseData = await _fetch(APIs.UPLOAD_TO_QiNiu, {}, DominConfigs.REQUEST_TYPE.POST, fetchParams);

		if (responseData) {
			resolve(responseData);
		} else {
			reject();
		}
	});
}

async function _fetch(url, params = {}, requestType, fetchParams = {}) {
	console.log(`-----------------\n发起${requestType}请求\n * url: ${url}\n * params:`);
	console.dir(params);

	const response = await fetch(url, fetchParams);
	const responseData = await response.json();

	console.log('请求返回: status:' + responseData.succ + '\n');
	console.dir(responseData);
	console.log('-----------------');

	if (responseData.succ === DominConfigs.RESPONSE_CODE.success) {
		// 请求成功 succ: 200 && status: 1
		if (responseData.status && responseData.status === DominConfigs.SERVICE_CODE.Successed) {
      
      if (responseData.msg) {
				message.success(responseData.msg);
      }
      
			return responseData.data;
		} else if (responseData.status === DominConfigs.SERVICE_CODE.Error) {
			message.error(responseData.msg);

			return null;
		} else if (responseData.status === DominConfigs.SERVICE_CODE.SetToken) {
			localStorage.setItem('token', responseData.data.token);

			return responseData.data;
		} else if (responseData.status === DominConfigs.SERVICE_CODE.OutTimeToken) {
			message.warning(responseData.msg);

			// token过期
			// 没法使用history
			window.href = '/login';

			return null;
		}
	}
=======
// export function uploadProjectImageToQiniu(image) {
//   return new Promise(async (resolve, reject) => {
//     const formdata = new FormData();
//     let fetchParams = {},
//       responseData = {};

//     // 获取上传token
//     let tokenResponse = await launchRequest(APIs.GetUploadToken, {
//       fileType: image.type
//     });

//     formdata.append('key', tokenResponse.key);
//     formdata.append('token', tokenResponse.token);
//     formdata.append('file', image);

//     fetchParams = {
//       method: DominConfigs.REQUEST_TYPE.POST,
//       body: formdata
//     };

//     responseData = await _fetch(
//       APIs.UPLOAD_TO_QiNiu,
//       {},
//       DominConfigs.REQUEST_TYPE.POST,
//       fetchParams
//     );

//     if (responseData) {
//       resolve(responseData);
//     } else {
//       reject();
//     }
//   });
// }

async function _fetch(url, params = {}, requestType, fetchParams = {}) {
  console.log(
    `-----------------\n发起${requestType}请求\n * url: ${url}\n * params:`
  );
  console.dir(params);

  try {
    const response = await fetch(url, fetchParams);
    const responseData = await response.json();

    console.log('请求返回: status:' + responseData.status + '\n');
    console.dir(responseData);
    console.log('-----------------');

    // 请求成功 status: 200
    if (
      responseData.status &&
      responseData.status === DominConfigs.RESPONSE_CODE.success
    ) {
      if (responseData.msg) {
        message.success(responseData.msg);
      }

      return responseData.data;
    } else if (responseData.status === DominConfigs.RESPONSE_CODE.error) {
      if (responseData.msg) {
        message.error(responseData.msg);
      }
      
      return null;
    } else if (
      responseData.status === DominConfigs.RESPONSE_CODE.unauthorized
    ) {
      message.warning(responseData.msg);

      // token过期
      // 没法使用history
      window.href = '/';

      return null;
    }
  } catch (error) {
    message.error('网络有点问题呦,请稍后再试');
  }
>>>>>>> 6097761b9ef750d8c2736bf86d90088a87bab8b7
}
