import React, { Fragment } from "react";
import { Grid, Text } from "../../elements";
import styled from "styled-components";

const AlarmUpdate = (props) => {
  return (
    <Fragment>
      <Grid
        margin="0 0 32px 0"
        height="auto"
        display="flex"
        alignItems="flex-start"
      >
        {!props?.check === true ? <NewDot /> : null}

        <Grid margin="0" display="flex" width="auto">
          <Grid
            display="flex"
            alignItems="center"
            height="auto"
            margin="0 0 10px 0"
          >
            <Text margin="0 8px 0 0" size="14px" display="inline">
              댓글등록
            </Text>
            <Text margin="0" size="12px" color="#828282" display="inline">
              {props?.createdAt}
            </Text>
          </Grid>
          <Grid height="auto" display="flex">
            {props.category === "update" ? (
              <Text cursor="pointer" margin="0">
                <span style={{ color: "#FF2D55" }}>{props?.groupTitle}</span>
                게시물이 수정되었습니다.
              </Text>
            ) : (
              <Text cursor="pointer" margin="0">
                <span style={{ color: "#FF2D55" }}>{props?.groupTitle}</span>
                게시물이 삭제되었습니다.
              </Text>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const NewDot = styled.div`
  border-radius: 100%;
  width: 13px;
  height: 13px;
  background-color: #68f99e;
  margin: 4px 12px 1px 0;
`;

export default AlarmUpdate;
