import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Text, Grid, Image, IconButton } from "../../elements";
import { bookmarkDB } from "../../redux/modules/course";
import { history } from "../../redux/configureStore";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import backBtn from "../../assets/groupFeed/backBtn.svg";
import starIcon from "../../assets/courseFeed/star.svg";
import bookmarkWhite from "../../assets/courseFeed/bookmarkWhite.svg";
import bookmarkGreen from "../../assets/courseFeed/bookmarkGreen.svg";

const MobileCourse = () => {
    const isMobile = useMediaQuery({
        query: "(max-width:820px)",
      });

    const dispatch = useDispatch();
    const course = useSelector((state) => state.mypage.mycourse);

    if(isMobile) {
      return (
        <>
          <Grid
            zIndex="3"
            bg="#ffffff"
            justifyContent="center"
            alignItems="center"
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="54px"
            display="flex"
            padding="10px 10px"
            margin="0 auto"
            boxShadow=" 0px 0px 30px #eee"
          >
            <Grid
                display="flex"
                width="375px"
                justifyContent="left"
                alignItems="center"
            >
              <img
                style={{ width: "10px", margin: "0 15px" }}
                src={backBtn}
                onClick={() => {
                  history.go(-1);
                }}
              />
              <Text 
                margin="0 0 0 120px" 
                bold 
                size="16px"
              >
                My 추천
              </Text>
            </Grid>
          </Grid> 

          <Grid
            width="368px"
            display="flex"
            justifyContent="space-between"
            padding="0 11px"
            margin="88px auto 100px auto "
          >
            {course.data.feed.length === 0 ? 
              <Box>내가 만든 코스추천 게시물이 없습니다</Box>
            :
              <>
                {course?.data?.feed?.map((feed, index) => {
                  return (
                    <Grid 
                      key={index}
                      width="168px" 
                      display="flex"
                      alignItems="center" 
                      _onClick={() => {
                        history.push(`/courseDetail/${feed?.courseId}`);
                    }}
                    >
                    <Grid
                      margin="0 0 75px 0"
                      width="100%"
                      display="flex"
                      flexDirection="column"
                    >
                      <Grid position="relative">
                        <img
                          style={{
                          width: "168px",
                          height: "126px",
                          position: "relative",
                          borderRadius: "3px 3px 0 0",
                        }}
                          src={feed?.courseImageUrl1}
                        />
                        {feed.bookmark ? ( 
                          <BookmarkWhite
                            onClick={() => {
                            dispatch(bookmarkDB(feed?.courseId));
                            }}
                            src={bookmarkGreen}
                        />
                        ) : ( 
                          <BookmarkWhite
                            onClick={() => {
                            dispatch(bookmarkDB(feed?.courseId));
                            }}
                            src={bookmarkWhite}
                          />
                        )} 

                        <Grid
                          width="156px"
                          height="auto"
                          bg="white"
                          borderRadius="6px"
                          padding="8px"
                          position="absolute"
                          left="6px"
                          bottom="-45px"
                        >
                        <Text margin="0 0 4px 0" size="9px" bold>
                          {feed?.title}
                        </Text>

                        <Grid display="flex" alignItems="center" margin="10px 0 8px 0">
                          <img style={{ width: "7.4px", height: "7px" }} src={starIcon} />
                          <Text margin="0 10px 0 4px"size="8px" bold>
                            {feed?.starPoint}
                          </Text>
                          <Text margin="0" color="#909090" size="8px">
                            리뷰{feed?.commentCnt}개
                          </Text>
                        </Grid>
                        <Grid cursor="pointer" display="flex">
                          <Tag>{feed?.location}</Tag>
                          <Tag>{feed?.distance}km</Tag>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                )
              })}
            </>
          }  
        </Grid>
      </>
    );  
  }   
};

const Box = styled.div`
  font-size: 16px;
  color: #333;
  height: 100px;
  width: 376px;
  background-color: #fff;
  padding: 150px 11px 250px 11px;
  text-align: center;
  border: none;
`;

const BookmarkWhite = styled.img`
  position: absolute;
  width: 15px;
  height: 19px;
  z-index: 2;
  right: 7px;
  top: 0;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 8px;
  height: 14px;
  background-color: #ddd;
  margin: 0 6px 0 0;
  padding: 0px 5px;
  border-radius: 2px;
`;

export default MobileCourse;