import React from 'react';

//数据模块交互
import { connect } from 'react-redux';
import { actions as questionnaireActions } from '../../../redux/questionnaire-model';

// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';

import '../../../style/questionnaire/welcome.css';
import { Row, Col, Typography, Button } from 'antd';
const { Title, Paragraph, Text } = Typography;

class WelcomeController extends React.Component {
  state = {
    loading: true,
    questionnaireDone: false,
  };
  render() {
    return (
      <div className="cont1">
        <Row type="flex" justify="space-between" className="news-row">
          <Col span={12}>
            <Typography className="typo1">
              <Title>专业测评系统</Title>
              <Paragraph>
                请务必诚实、独立地回答问题，只有如此，才能得到有效的结果。
              </Paragraph>
              <Paragraph>
                <Text strong>《专业分析报告》</Text>
                展示的是你的专业倾向，而不是你的知识、技能、经验。
              </Paragraph>
              <Paragraph>
                本测试共60题；需时约10分钟。所有题目没有对错之分，请根据自己的实际情况选择。
              </Paragraph>
              <Paragraph>
                只要你认真、真实地填写了测试问卷，那么通常情况下你都能得到一个确实和你的性格相匹配地类型，从而我们可以得知您所适合报考的专业。
              </Paragraph>
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                size="large"
                disabled={this.state.loading}
                onClick={() => {
                  this.handleStart();
                }}
              >
                {this.state.loading
                  ? '加载中...'
                  : this.state.questionnaireDone
                  ? '查看结果'
                  : '开始测试'}
              </Button>
            </Typography>
          </Col>
          <Col span={9}>
            <img
              src={require('../../../assets/images/questionnaire-welcome/draw.png')}
              className="main-img"
              alt=""
            />
          </Col>
        </Row>
      </div>
    );
  }

  handleStart = () => {
    this.state.questionnaireDone
      ? this.props.setQuesStatus(2)
      : this.props.setQuesStatus(1);
  };

  componentDidMount = async () => {
    let status = await launchRequest(APIS.GET_QUESTIONNAIRE_STATUS);
    console.log('show status', status);
    if (!status) {
      return;
    }
    status = status.status[0].isEvaluate;
    console.log('status', status);
    await this.setState({
      loading: false,
      questionnaireDone: status ? true : false,
    });
  };
}

const mapStateToProps = store => {
  const questionnaireStore = store['questionnaireStore'];
  let { status } = questionnaireStore;

  return {
    status,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setQuesStatus: pageIndex => {
      dispatch(questionnaireActions.setQuesStatus(pageIndex));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WelcomeController);
