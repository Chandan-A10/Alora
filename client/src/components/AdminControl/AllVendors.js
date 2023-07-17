import { Avatar, Button, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const count = 10;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const AllVendors = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);
  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        
      });
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>load more...</Button>
      </div>
    ) : null;
  return (
    <>
    <div>
        <p>Search Box</p>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        style={{width:'90%'}}
        renderItem={(item) => (
            <List.Item
            actions={[
              <Link key="list-loadmore-disable">disable</Link>,
              <Link key="list-loadmore-products">products</Link>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={item.name?.last}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </Skeleton>
          </List.Item>
        )}
      />
      <br></br>
    </div>
    </>
  );
};

export default AllVendors;