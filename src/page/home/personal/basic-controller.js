import React from 'react';

// UI组件
import { Form, Input, Radio, InputNumber, Button, Select } from 'antd';

// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';
import * as DominConfigs from '../../../constants/domin-constants';

// CSS
import '../../../style/basic.css';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as userActions } from "../../../redux/user-model";

const { Option } = Select;

class BasicController extends React.Component {
	state = {
		loading: false,
		provinceList: []
	};
	render() {
		const { getFieldDecorator } = this.props.form,
			formItemLayout = {
				labelCol: {
					xs: { span: 24 },
					sm: { span: 8 }
				},
				wrapperCol: {
					xs: { span: 24 },
					sm: { span: 8 }
				}
			},
			isConfirm = !!this.props.user.confirm,
			optionList = this.state.provinceList.map((provinceItem) => {
				return (
					<Option key={provinceItem.id} value={provinceItem.id}>
						{provinceItem.province_name}
					</Option>
				);
			}); // 地区的list

		let yearsList = [];
		for (let i = -1; i < 3; i++) {
			yearsList.push(
				<Option key={new Date().getFullYear() - i} value={new Date().getFullYear() - i}>
					{new Date().getFullYear() - i}
				</Option>
			);
		}

		return (
			<div className='basic-info'>
				<Form {...formItemLayout} onSubmit={this.handleSubmit}>
					<Form.Item label='姓名'>
						{getFieldDecorator('nickname', {
							rules: [
								{
									required: true,
									message: '请输入姓名'
								}
							]
						})(<Input placeholder='请输入姓名' disabled={isConfirm} />)}
					</Form.Item>
					<Form.Item label='地区'>
						{getFieldDecorator('addressProvince', {
							rules: [
								{
									required: true,
									message: '请选择地区'
								}
							]
						})(<Select disabled={isConfirm}>{optionList}</Select>)}
					</Form.Item>
					<Form.Item label='考试年份'>
						{getFieldDecorator('examYear', {
							rules: [
								{
									required: true,
									message: '请选择考试年份'
								}
							]
						})(<Select disabled={isConfirm}>{yearsList}</Select>)}
					</Form.Item>
					<Form.Item label='性别'>
						{getFieldDecorator('gender', {
							rules: [
								{
									required: true,
									message: '请选择性别'
								}
							]
						})(
							<Radio.Group disabled={isConfirm}>
								<Radio value='1'>男</Radio>
								<Radio value='2'>女</Radio>
							</Radio.Group>
						)}
					</Form.Item>
					<Form.Item label='科系'>
						{getFieldDecorator('accountCategory', {
							rules: [
								{
									required: true,
									message: '请选择科系'
								}
							]
						})(
							<Radio.Group disabled={isConfirm}>
								<Radio value='1'>理科</Radio>
								<Radio value='2'>文科</Radio>
							</Radio.Group>
						)}
					</Form.Item>
					<Form.Item label='分数'>
						{getFieldDecorator('score', {
							rules: [
								{
									required: true,
									message: '请输入分数'
								}
							]
						})(<InputNumber disabled={isConfirm} />)}
					</Form.Item>
					<Form.Item wrapperCol={{ span: 12, offset: 8 }}>
						{isConfirm ? (
							undefined
						) : (
							<Button type='primary' htmlType='submit' shape='round' loading={this.state.loading}>
								保存
							</Button>
						)}
					</Form.Item>
				</Form>
			</div>
		);
	}

	componentDidMount = async () => {
		let data = await launchRequest(APIS.GET_ADDRESS_OPTION, {}, DominConfigs.REQUEST_TYPE.GET);

		this.setState({
			provinceList: data.provinceList
		});
	};

	// 保存
	handleSubmit = (e) => {
		e.preventDefault(); //阻止button submit的默认行为

		this.setState({
			loading: true
		});

		// 表单验证
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				// 提交表单
        let user = await launchRequest(APIS.SET_USER_INFO, values);
        this.props.recordUser(user);
				await this.setState({
					loading: false
				});
			} else {
				this.setState({
					loading: false
				});
			}
		});
	};
}

// 从store接收state数据
const mapStateToProps = (store) => {
	const userStore = store['userStore'];
	let { user } = userStore;

	return {
		user
	};
};

// 向store dispatch action
const mapDispatchToProps = (dispatch) => {
	return {
    recordUser: params => {
      dispatch(userActions.recordUser(params));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
	Form.create({
		name: 'alterBasicInfo',
		mapPropsToFields(props) {
			let user = props.user;
			return {
				nickname: Form.createFormField({
					value: user.nickname
				}),
				gender: Form.createFormField({
					value: user.gender
				}),
				accountCategory: Form.createFormField({
					value: user.account_category
				}),
				score: Form.createFormField({
					value: user.score
				}),
				addressProvince: Form.createFormField({
					value: user.address_province
				}),
				examYear: Form.createFormField({
					value: user.exam_year
				})
			};
		}
	})(BasicController)
);