//Grid header contains pagination and sort method selector
//for homepage
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePageAction,
  setSortMethodAction,
} from '../../state/actionCreators/actions';
import { Pagination, Select, Row, Col } from 'antd';

//Pagination component
const PageNav = (props) => {
  const dispatch = useDispatch();
  const [page, pageTotal] = props.pages;

  const changePage = (page) => {
    dispatch(changePageAction(page));
  };

  return (
    <Pagination
      simple
      defaultCurrent={page}
      total={pageTotal * 10}
      onChange={(e) => {
        changePage(e);
      }}
    />
  );
};
//Finish

//Sort method selector component
const SortSelector = (props) => {
  const dispatch = useDispatch();
  const sortMethod = props.sortMethod;
  const { Option } = Select;

  const setSortMethod = (sortMethod) => {
    dispatch(setSortMethodAction(sortMethod));
  };

  return (
    <Select
      defaultValue={sortMethod}
      style={{ width: '150px', textAlign: 'center' }}
      onChange={(e) => {
        setSortMethod(e);
      }}
    >
      <Option value='popular'>Popular</Option>
      <Option value='now_playing'>Now Playing</Option>
      <Option value='top_rated'>Top Rated</Option>
      <Option value='upcoming'>Upcoming</Option>
    </Select>
  );
};
//Finish

//Wrapping pagination and sort method selector and return as a component
const GridHeader = (props) => {
  const page = useSelector((state) => state.page);
  const pageTotal = useSelector((state) => state.pageTotal);
  const sortMethod = useSelector((state) => state.sortMethod);

  return (
    <>
      <Row justify='center'>
        <Col span={24} style={{ textAlign: 'center' }}>
          <PageNav pages={[page, pageTotal]} />
        </Col>
      </Row>
      {props.pageName === 'home' ? (
        <Row justify='end'>
          <Col span={24} style={{ textAlign: 'end' }}>
            <SortSelector sortMethod={sortMethod} />
          </Col>
        </Row>
      ) : (
        <></>
      )}
    </>
  );
};
//Finish

export default GridHeader;
