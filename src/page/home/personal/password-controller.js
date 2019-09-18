import React from 'react';

import { Form, Input, Button, message } from 'antd';

import '../../../style/personal-password.css';

// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';

// 密码加密
import md5 from 'md5';

class PasswordController extends React.Component {
	state = {
		loading: false,
		oldPassword: '',
		newPassword: '',
		confirmPassword: ''
	};

	render() {
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			}
		};
		return (
			<div className='con'>
				<Form {...formItemLayout}>
					<Form.Item label='原密码' {...formItemLayout}>
						<Input
							placeholder='请输入原密码'
							type='password'
							onChange={(e) => this.setState({ oldPassword: e.target.value })}
						/>
					</Form.Item>
					<Form.Item label='新密码' {...formItemLayout}>
						<Input
							placeholder='请输入新密码'
							type='password'
							onChange={(e) => this.setState({ newPassword: e.target.value })}
						/>
					</Form.Item>
					<Form.Item label='确认密码' {...formItemLayout}>
						<Input
							placeholder='请重新输入新密码'
							type='password'
							onChange={(e) => this.setState({ confirmPassword: e.target.value })}
						/>
					</Form.Item>
					<Form.Item wrapperCol={{ span: 12, offset: 8 }}>
						<Button type='primary' onClick={this.submit} loading={this.state.loading}>
							保存
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}

	submit = async () => {
    await this.setState({loading: true})

		if (this.state.confirmPassword !== this.state.newPassword) {
			message.error('新密码和确认密码需要一致');
			return;
		} else {
			// 发起修改密码的请求
			await launchRequest(APIS.ALTER_USER_PASSWORD, {
				oldPassword: md5(this.state.oldPassword),
				newPassword: md5(this.state.newPassword)
      });
      
      this.props.history.push(`/login`);
    }
    
    await this.setState({loading: false});
	};
}
export default PasswordController;