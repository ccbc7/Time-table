import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Montserrat } from "@next/font/google";
import { Noto_Serif_JP } from "@next/font/google";
import SlideUpComponent from "./SlideUpComponent";

const montserrat = Montserrat({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});
const NSJ = Noto_Serif_JP({
  weight: ["200", "300"],
  subsets: ["latin"],
  display: "swap",
});

const SliderComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    afterChange: (current) => setCurrentSlide(current),
  };

  const settings2 = {
    ...settings,
    afterChange: (current) => setCurrentSlide2(current),
  };

  const steps = [
    "1.&nbsp;施設を登録する",
    "2.&nbsp;予約したい施設を選ぶ",
    "3.&nbsp;施設を予約する",
    "4.&nbsp;予定を確認する",
  ];

  const descriptions = [
    "まずは、使いたい施設を登録していきましょう。\n施設名、施設の写真、施設詳細を登録できます。\n登録した施設は全員に共有されます。",
    "次に、予約したい施設を選びます。\n予約状況は、カレンダーで確認することができます。\nまた、施設に対するコメントがあれば、コメントが表示されます。\nコメントを書き込むこともできるので、気になっていることをなどを投稿できます。",
    "選んだ施設を予約します。\n予約状況をみて、日付、時間、使用者、目的を記入し予約してください。\n予約した内容は他のユーザーに共有されます。",
    "Topページで自分のスケジュールを確認することができます。\n緑色の部分が予約済みの時間帯です。\nカレンダーをクリックすることで、予約者の情報を確認することもできます。",
  ];

  const steps2 = [
    "1.&nbsp;時間名登録機能",
    "2.&nbsp;通知機能",
  ];

  const descriptions2 = [
    "カレンダーに使われている時間名を変更することができます。\n初期設定では、朝〜放課後となっていますが、使いたいワードに変更することができます",
    "予約をした後に、ベルマークをクリックすると、最新の５件の予約を表示してくれます。",
  ];

  return (
    <>
      <SlideUpComponent>
        <div className="bg-gradient-to-b from-pink-50 to-green-100 flex justify-center items-center py-3">
          <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-5xl py-6 px-10">
            <p
              className={`${NSJ.className} text-3xl border-b-2 text-center pb-3`}
            >
              Time tableとは？
            </p>
            <p className={`${NSJ.className} my-3 text-center`}>
              Time tableは、人と施設と時間を繋げるアプリです。
            </p>
          </div>
        </div>
      </SlideUpComponent>
      <SlideUpComponent>
        <div className="bg-gradient-to-b from-green-100 to-green-50 flex justify-center items-center py-3">
          <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-5xl py-6 px-10">
            <div className="sm:flex">
              <div>
                <ul className="list-none">
                  <p className={`${NSJ.className} text-2xl border-b `}>
                    なにができる？
                  </p>
                  <li className={`${NSJ.className} my-3`}>
                    カレンダーを見ながら、いつ、だれが、どんな目的で施設を使うのかを管理することができます。
                  </li>
                  <p className={`${NSJ.className} text-2xl border-b `}>
                    メリット
                  </p>
                  <p className={`${NSJ.className} my-3`}>
                    <li>
                      カレンダーを共有して施設を予約していくことで、ブッキングの心配が減ります。
                    </li>
                    <li>
                      施設を使う人たちが今どこにいるのかを把握しやすくなり、連絡と連携がとりやすくなります。
                    </li>
                    <li>
                      施設へのコメントを共有することで、施設を使う人たち同士の情報共有がしやすくなります。
                    </li>
                    <li>学校施設など、施設が多数ある場所で役立ちます。</li>
                  </p>
                </ul>
              </div>
              <div className="w-1/3 mt-3 ml-7">
                <img src="/F.png" alt="F" />
              </div>
            </div>
          </div>
        </div>
      </SlideUpComponent>
      <SlideUpComponent>
        <div className="bg-green-50 flex justify-center items-center py-3">
          <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-5xl pb-8 px-7">
            <p className={`${NSJ.className} text-3xl border-b`}>
              Time tableの使い方
            </p>
            <div className="sm:flex sm:space-x-10">
              <div className="sm:w-1/2">
                <div
                  style={{ width: "100%", margin: "auto", marginTop: "20px" }}
                >
                  <Slider {...settings}>
                    <div>
                      <video
                        src="/A.mov"
                        alt="Video slide"
                        style={{ borderRadius: "10px" }}
                        autoPlay
                        muted
                        controls
                      />
                    </div>
                    <div>
                      <video
                        src="/B.mov"
                        alt="Video slide"
                        style={{ borderRadius: "10px" }}
                        autoPlay
                        muted
                        controls
                      />
                    </div>
                    <div>
                      <video
                        src="/C.mov"
                        alt="Video slide"
                        style={{ borderRadius: "10px" }}
                        autoPlay
                        muted
                        controls
                      />
                    </div>
                    <div>
                      <img
                        src="/D.png"
                        alt="D"
                        style={{ borderRadius: "10px" }}
                      />
                    </div>
                  </Slider>
                </div>
              </div>
              <div className="sm:w-1/2 pt-4">
                <ul className={`${NSJ.className}`}>
                  <li
                    className="border-y mb-3 sm:text-3xl text-xl mt-5 sm:mt-0 sm:border-t-0"
                    dangerouslySetInnerHTML={{ __html: steps[currentSlide] }}
                  ></li>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: descriptions[currentSlide]?.replace(
                        /\n/g,
                        "<br />"
                      ),
                    }}
                  ></p>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SlideUpComponent>
      <SlideUpComponent>
        <div className="bg-gradient-to-b from-green-50 to-white flex justify-center items-center py-3">
          <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-5xl pb-8 px-7">
            <p className={`${NSJ.className} text-3xl border-b`}>その他機能</p>
            <div className="sm:flex sm:space-x-10">
              <div className="sm:w-1/2">
                <div
                  style={{ width: "100%", margin: "auto", marginTop: "20px" }}
                >
                  <Slider {...settings2}>
                    <div>
                      <video
                        src="/D.mov"
                        alt="Video slide"
                        style={{ borderRadius: "10px" }}
                        autoPlay
                        muted
                        controls
                      />
                    </div>
                    <div>
                      <img
                        src="/E.png"
                        alt="E"
                        style={{ borderRadius: "10px" }}
                      />
                    </div>
                  </Slider>
                </div>
              </div>
              <div className="sm:w-1/2 pt-4">
                <ul className={`${NSJ.className}`}>
                  <li
                    className="border-y mb-3 sm:text-3xl text-xl mt-5 sm:mt-0 sm:border-t-0"
                    dangerouslySetInnerHTML={{ __html: steps2[currentSlide] }}
                  ></li>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: descriptions2[currentSlide2]?.replace(
                        /\n/g,
                        "<br />"
                      ),
                    }}
                  ></p>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SlideUpComponent>
    </>
  );
};

export default SliderComponent;
