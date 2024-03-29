import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResultData } from "./data/resultdata";
import Slider from "react-slick";
import axios from "axios";
import KakaoShareButton from "./kakao";

import MapPop from "../map/map";

const Result = () => {
  const nodeURL = "https://www.eatcook.today/api";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const food = searchParams.getAll("food");
  const [resultData, setResultData] = useState([]);

  const [ip, setIp] = useState("");

  const [isLike, setIsLike] = useState(false);
  const likePics = {
    isLike: "./img/like_btn.png",
    disLike: "./img/like_btn_g.png",
  };

  const [showPop, setShowPop] = useState(false);
  function popShow() {
    setShowPop(true);
  }

  const [resultNo, setResultNo] = useState();

  useEffect(() => {
    //console.log(food);

    // console.log(resultNo);

    const result = ResultData.filter((x, i) => {
      for (var i in food) {
        if (x.name === food[i]) {
          return x.name;
        }
      }
    });

    if (result.length === 0) {
      setResultNo(false);
    } else {
      setResultNo(true);
    }

    setResultData(result);
    axios
      .get(nodeURL + `/like/${food}`)
      .then((response) => {
        const _resultData = response.data.foodFind.map((rowData) => ({
          name: rowData.name,
          like: rowData.like,
          likeOn: rowData.likeOn,
          isLike: rowData.isLike,
          text: rowData.text,
          foodImg: rowData.foodImg,
        }));

        const _ip = response.data.foodFind.map((rowData) => ({
          likeOn: rowData.likeOn,
        }));

        setResultData(_resultData);
      })
      .catch((err) => {
        console.log("다시 체크해주세요!");
      });

    axios
      .get(nodeURL + "/ipCheck")
      .then((response) => {
        // console.log(response.data);
        setIp(response.data.ip);
        // console.log("A:", response.data.ip);
      })
      .catch((err) => {
        console.log("ip 확인 실패!");
      });
  }, [resultData.like, resultNo]);

  const slider = React.useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  // 좋아요

  function LikeBtn(aa, bb, cc) {
    //console.log(ip);
    // console.log(isLike);
    if (!cc) {
      setIsLike((cc) => true);
      setResultData(
        resultData.map((it) =>
          it.name === aa ? { ...it, like: bb + 1, isLike: true } : it
        )
      );
      axios
        .post(nodeURL + `/like/${aa}`, {
          like: bb + 1,
          ip: ip,
          isLike: true,
        })
        .then((response) => {
          // console.log(response);
          //window.location.reload(); // 화면을 새로고침 한다.
        })
        .catch((err) => {
          console.log("좋아요 오류!");
        });
    } else {
      setIsLike((cc) => false);
      setResultData(
        resultData.map((it) =>
          it.name === aa ? { ...it, like: bb - 1, isLike: false } : it
        )
      );
      axios
        .post(process.env.NODE_URL + `/like/${aa}`, {
          like: bb - 1,
          ip: ip,
          isLike: false,
        })
        .then((response) => {
          // console.log(response);
          //window.location.reload(); // 화면을 새로고침 한다.
        })
        .catch((err) => {
          console.log("좋아요 오류!");
        });
    }
  }

  return (
    <>
      <div id="sub_wrap">
        {!resultNo ? (
          <div className="result_NO">
            <p>결과가 없습니다</p>
            <button onClick={() => navigate("/question")}>
              <img src="./img/restart_btn.png" alt="다시하기" />
            </button>
          </div>
        ) : (
          <div className="result_inner">
            <div className="slider_wrap">
              <button
                onClick={() => slider?.current?.slickPrev()}
                className="prev_btn slider_btn"
              >
                <img src="./img/slider_prev.png" alt="prev" />
              </button>
              <button
                onClick={() => slider?.current?.slickNext()}
                className="next_btn slider_btn"
              >
                <img src="./img/slider_next.png" alt="prev" />
              </button>
              <Slider ref={slider} {...settings}>
                {resultData.map((ele) => (
                  <div key={ele.name} className="food_list">
                    <div className="food_list_inner">
                      <img
                        src="./img/food_img.png"
                        alt=""
                        className="foodImg"
                      />

                      <div className="text_wrap">
                        <p className="food_title">“{ele.name}”</p>
                        <p className="food_text">{ele.text}</p>
                      </div>
                      <div className="btn_list">
                        <button
                          onClick={() => {
                            LikeBtn(ele.name, ele.like, ele.isLike);
                          }}
                        >
                          {ele.isLike ? (
                            <img src={likePics.isLike} />
                          ) : (
                            <img src={likePics.disLike} />
                          )}
                        </button>
                        {ele.like}
                      </div>
                    </div>
                    <div className="food_shadow"></div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="bt_btn">
              <KakaoShareButton food={food} />
              <button onClick={() => navigate("/question")}>
                <img src="./img/restart_btn.png" alt="다시하기" />
              </button>
            </div>
            <div className="bt_btn2">
              <button onClick={popShow}>내 주변 맛집 리스트 보러가기</button>
            </div>
          </div>
        )}
      </div>

      <button
        className={"black_bg" + (showPop ? " show" : "")}
        onClick={() => setShowPop(false)}
      />

      <button
        className={"close_btn" + (showPop ? " show" : "")}
        onClick={() => setShowPop(false)}
      >
        X
      </button>

      {showPop ? (
        <MapPop setShowPop={setShowPop} resultData={resultData} />
      ) : null}
    </>
  );
};

export default Result;
