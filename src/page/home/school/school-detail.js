import React from 'react';

// 关于数据模块交互
import { connect } from 'react-redux';
// import { actions as schoolActions } from '../../../redux/school-model';

class SchoolDetailController extends React.Component {
	componentDidUpdate(prevProps, prevState) {
		console.log('prevprev', prevProps);
		console.log('now now', this.props)
	}

	render() {
    let schoolDetail = this.props.schoolDetail;

    // 这里应该改成判断loading是否为true然后显示loading
		if (Object.keys(schoolDetail).length !== 0) {
      return (
				<div>
					<h3>{schoolDetail.school_name}</h3>
					<h5>一丶基本资料</h5>
					<div>
						办学性质:
						<ul>{schoolDetail.school_nature_name.map((item, index) => <li key={index}>{item}</li>)}</ul>
					</div>
					<div>
						学校属性:
						<ul>{schoolDetail.school_property_name.map((item, index) => <li key={index}>{item}</li>)}</ul>
					</div>
					<div>
						高效类别:
						<ul>{schoolDetail.school_type_name.map((item, index) => <li key={index}>{item}</li>)}</ul>
					</div>
					<div>
						地域特色:
						<ul>{schoolDetail.area_feature_name.map((item, index) => <li key={index}>{item}</li>)}</ul>
					</div>
          <p>院校地址: {schoolDetail.school_address}</p>
          <p>院校电话: {schoolDetail.school_phone}</p>
          <p>院校简介: {schoolDetail.school_intro}</p>
          <h5>二丶基本资料</h5>
          <p>国家特色专业: {schoolDetail.national_characteristic_major}</p>
          <h5>三丶录取原则</h5>
          <p>专业录取: {schoolDetail.major_admission_principles}</p>
          <p>特殊要求: {schoolDetail.special_requirements}</p>   
				</div>
			);
    } else {
      return (<span>等待</span>)
    }
	}
}

// 从store接收state数据
const mapStateToProps = (store) => {
	const schoolStore = store['schoolStore'];
	let { schoolDetail } = schoolStore;

	return {
		schoolDetail
	};
};

// 向store dispatch action
const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolDetailController);
