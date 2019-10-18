import React, { useEffect, useState } from 'react';

import { Icon } from 'antd';

import moment from 'moment';

// 路由
import { Link } from 'react-router-dom';

// 路由
import { NEWS_DETAIL } from '@/constants/route-constants';

export default props => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    let _newsList = props.newsList.map((item, index) => {
      return (
        <Link
          to={{
            pathname: `/${NEWS_DETAIL.path}/${item.uuid}&${item.type}`
          }}
          key={item.uuid}
        >
          <li>
            <div>
              <h5>{item.title}</h5>
              <span className='major-information-time-box'>
                <Icon type='clock-circle' />
                {moment(item.createTime).format('MM-DD h:mm')}
              </span>
              <span className='major-information-see-box'>
                <Icon type='eye' /> {item.viewTimes}
              </span>
            </div>
            <div className='major-information-tags'>
              {!index ? <span>NEW</span> : undefined}
              <span>HOT</span>
            </div>
          </li>
        </Link>
      );
    });

    setNewsList(_newsList);
  }, [props.newsList]);

  return (
    <div className='major-information-box'>
      <h2 className='h2-title-box'>
        <span className='index-h2-title'>专业百科</span>
        <span className='index-more'>
          更多 <Icon type='right' />
        </span>
      </h2>
      <ul>{newsList}</ul>
    </div>
  );
};
