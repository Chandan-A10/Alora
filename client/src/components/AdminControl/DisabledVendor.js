import { Avatar, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const count = 10;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const DisabledVendors = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setList(res.results);
      });
  }, []);

  return (
    <>
    <div>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={list}
        style={{width:'90%'}}
        renderItem={(item) => (
            <List.Item
            actions={[
              <Link key="list-loadmore-enable">enable</Link>,
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

export default DisabledVendors;
