import './mypage-myfunding.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MypageProfile from '../../../molecules/MypageProfile/mypageprofile';
import MyPageIndex from "../../../molecules/MypageIndex/mypageindex";
import MyfundingNonFundingPane from "../../../molecules/Mypage-Myfunding/mypage-myfunding-nonfunding";
import MyfundingDoFundingPane from "../../../molecules/Mypage-Myfunding/mypage-myfunding-dofunding";
import MyfundingFinFundingPane from "../../../molecules/Mypage-Myfunding/mypage-myfunding-finfunding";

const MypagePane = () => {
    const [apiData, setApiData] = useState(null);
    const [isFundingClosed, setIsFundingClosed] = useState(false); // 펀딩 종료 여부 상태
    const [deadlineDate, setDeadlineDate] = useState(null); // 마감일 상태 추가

    const handleButtonClick = (index) => {
        console.log(`Selected index: ${index}`);
    };

    useEffect(() => {
        // API 호출 함수
        const fetchData = async () => {
            try {
                const response = await axios({
                    method: 'GET',
                        url: 'https://65fd-112-218-95-58.ngrok-free.app/api/v1/funding/my-funding-status?memberId=1',
                    headers: {
                        "Access-Control-Allow-Credentials": true,
                        "ngrok-skip-browser-warning": true
                    },
                    responseType: 'json'
                });
                console.log(response.data); // 콘솔에 데이터 출력
                setApiData(response.data.data); // 상태에 데이터 저장

                setIsFundingClosed(response.data.data.isFundingClosed);
                const fetchedDeadlineDate = response.data.data.deadlineDate;

                // "종료"인 경우에만 상태를 "종료"로 설정
                if (fetchedDeadlineDate === "종료") {
                    // 종료버튼 눌렀을때 날짜뜨는거 여기 수정 필요
                    setDeadlineDate(fetchedDeadlineDate); 
                } else {
                    setDeadlineDate(response.data.data.deadline);
                }

                console.log("isFundingClosed:", response.data.data.isFundingClosed);
                console.log("deadlineDate:", response.data.data.deadlineDate);
            } catch (error) {
                console.error("API 호출 중 오류가 발생했습니다.", error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="mypage-total-container">
            <div className="mypage-left-pane-container">
                {apiData && <MypageProfile profileInfo={apiData} />}
                <MyPageIndex onButtonClick={handleButtonClick} currentPageIndex={0} />
            </div>
            <div>
                {apiData && apiData.myPageMemberDto && !apiData.myPageFundingItemDtoList && !apiData.participateFriendDtoList && (
                    <MyfundingNonFundingPane />
                )}
                {apiData &&
                    apiData.myPageFundingItemDtoList &&
                    apiData.participateFriendDtoList &&
                    apiData.myPageFundingItemDtoList.length > 0 &&
                    !isFundingClosed &&
                    apiData.deadlineDate !== "종료" && (
                        <MyfundingDoFundingPane
                            apiData={apiData}
                            deadline={apiData.deadline}
                            deadlineDate={apiData.deadlineDate}
                            totalPercent={apiData.totalPercent}
                            message={apiData.message}
                            tag={apiData.tag}
                            participateFriendDtoList={apiData.participateFriendDtoList}
                            myPageFundingItemDtoList={apiData.myPageFundingItemDtoList}
                            setIsFundingClosed={setIsFundingClosed}
                            isFundingClosed={isFundingClosed}
                        />
                    )}

                {apiData && (isFundingClosed || apiData.deadlineDate === "종료") && (
                    <MyfundingFinFundingPane
                        apiData={apiData}
                        deadline={apiData.deadline}
                        deadlineDate={deadlineDate}
                        totalPercent={apiData.totalPercent}
                        message={apiData.message}
                        tag={apiData.tag}
                        participateFriendDtoList={apiData.participateFriendDtoList}
                        myPageFundingItemDtoList={apiData.myPageFundingItemDtoList}
                        setIsFundingClosed={setIsFundingClosed}
                        isFundingClosed={isFundingClosed}
                    />
                )}
            </div>
        </div>
    );
}

export default MypagePane;
