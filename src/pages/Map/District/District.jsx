import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import s from "./District.module.scss";
import beitou from "../../../assets/home/district/beitou.svg";
import shilin from "../../../assets/home/district/shilin.svg";
import datong from "../../../assets/home/district/datong.svg";
import zhongshan from "../../../assets/home/district/zhongshan.svg";
import songshan from "../../../assets/home/district/songshan.svg";
import neihu from "../../../assets/home/district/neihu.svg";
import wanhua from "../../../assets/home/district/wanhua.svg";
import zhongzheng from "../../../assets/home/district/zhongzheng.svg";
import daan from "../../../assets/home/district/daan.svg";
import xinyi from "../../../assets/home/district/xinyi.svg";
import nangang from "../../../assets/home/district/nangang.svg";
import wenshan from "../../../assets/home/district/wenshan.svg";
import cross from "../../../assets/map/cross.svg";
import CafeMap from "../../../components/CafeMap/CafeMap";
import CafeCard from "../../../components/CafeCard/CafeCard";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";

function District() {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollToFilter) {
      const filter = document.getElementById("filter");
      if (filter) {
        filter.scrollIntoView();
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const { district } = useParams();

  const districtMap = {
    beitou: {
      name: "北投區",
      img: beitou,
    },
    shilin: {
      name: "士林區",
      img: shilin,
    },
    datong: {
      name: "大同區",
      img: datong,
    },
    zhongshan: {
      name: "中山區",
      img: zhongshan,
    },
    songshan: {
      name: "松山區",
      img: songshan,
    },
    neihu: {
      name: "內湖區",
      img: neihu,
    },
    wanhua: {
      name: "萬華區",
      img: wanhua,
    },
    zhongzheng: {
      name: "中正區",
      img: zhongzheng,
    },
    daan: {
      name: "大安區",
      img: daan,
    },
    xinyi: {
      name: "信義區",
      img: xinyi,
    },
    nangang: {
      name: "南港區",
      img: nangang,
    },
    wenshan: {
      name: "文山區",
      img: wenshan,
    },
  };
  const districtName = districtMap[district].name;
  const districtImg = districtMap[district].img;

  const allTags = [
    {
      id: "wifi",
      zh: "WiFi",
      en: "WiFi",
    },
    {
      id: "plug",
      zh: "插座",
      en: "Power Outlet",
    },
    {
      id: "special",
      zh: "特色咖啡",
      en: "Special",
    },
    {
      id: "latteArt",
      zh: "拉花",
      en: "Latte art",
    },
    {
      id: "handbrew",
      zh: "職人手沖",
      en: "Hand Brew",
    },
    // {
    //   id: "roaster",
    //   zh: "自家烘焙",
    //   en: "In-house Roaster",
    // },
    {
      id: "dessert",
      zh: "甜點搭配",
      en: "Dessert",
    },
    {
      id: "noTimeLimit",
      zh: "不限時間",
      en: "No Time Limit",
    },
    {
      id: "petFriendly",
      zh: "寵物友善",
      en: "Pet Friendly",
    },
    // {
    //   id: "LGBTFriendly",
    //   zh: "LGBT友善",
    //   en: "LGBT Friendly",
    // },
  ];

  // let selectedTags = [];
  const districtLabels = [
    { id: "beitou", label: "北投區" },
    { id: "shilin", label: "士林區" },
    { id: "datong", label: "大同區" },
    { id: "zhongshan", label: "中山區" },
    { id: "songshan", label: "松山區" },
    { id: "neihu", label: "內湖區" },
    { id: "wenshan", label: "文山區" },
    { id: "wanhua", label: "萬華區" },
    { id: "zhongzheng", label: "中正區" },
    { id: "daan", label: "大安區" },
    { id: "nangang", label: "南港區" },
    { id: "xinyi", label: "信義區" },
  ];

  const cafes = JSON.parse(localStorage.getItem("cafes"));
  // console.log("cafes", cafes)
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);

  const toggleTag = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const displayFilter =
    cafes.filter(
      (cafe) =>
        selectedTags.every((tag) => cafe.tags.includes(tag)) &&
        (selectedAreas.length === 0 ||
          selectedAreas.some((areaTag) => cafe.district_id === areaTag))
    ) || [];

  const menuProps = {
    PaperProps: {
      sx: {
        maxHeight: 280, // 下拉選單的最大高度
        // width: 150,           // 下拉選單的寬度
        backgroundColor: "#904118",
        "&::-webkit-scrollbar": {
          width: "12px", // Scroll Bar 寬度
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#6b3112", // 滑塊顏色
          borderRadius: "99px", // 滑塊圓角
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#55270e", // 滑塊在 hover 時顏色
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#fff1cb", // 軌道顏色
        },
      },
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedAreas(typeof value === "string" ? value.split(",") : value);
  };
  // console.log("area:", selectedAreas);
  // console.log("tags", selectedTags);
  // console.log("filter", displayFilter);

  const filterRef = useRef(null);
  const scrollDown = () => {
    filterRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let displayPopular = [];
  displayPopular = cafes.filter((cafe) => cafe.district_id === district);
  // console.log("popular", displayPopular);

  return (
    <>
      <section className={s.recommend}>
        <div className={s.content}>
          {/* Left side */}
          <div className={s.districtImg}>
            <img src={districtImg} alt="" />
          </div>
          {/* Right side */}
          <div className={s.popular}>
            <div className={s.title}>{districtName} 熱門咖啡廳</div>
            <div className={s.cards}>
              {displayPopular.slice(0, 3).map((cafe, index) => (
                <CafeCard
                  key={index}
                  title={cafe.name_zh}
                  desc={cafe.description}
                  rating={cafe.rating}
                  img={`${cafe.district_id}_${cafe?.id}_1`}
                  cafe={cafe}
                  displayFilter={
                    selectedAreas.length === 0 && selectedTags.length === 0
                      ? []
                      : displayFilter
                  }
                />
              ))}
            </div>
            <div className={s.btn}>
              <div className={s.btnBg} onClick={scrollDown}>
                <button>查看更多</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Filter Section */}
      <section className={s.filter} ref={filterRef} id="filter">
        <div className={s.main}>
          <div className={s.tags}>
            <div className={s.areasTag}>
              {/* <button
                className={`${s.tag} ${s.areasTag} ${
                  selectedAreas.length > 0 ? s.active : ""
                }`}
              >
                區域
              </button> */}
              {/* <div className={s.areas}> */}
              <FormControl>
                <InputLabel
                  id="demo-multiple-checkbox-label"
                  sx={{
                    color: "#904118",
                    backgroundColor: "#fff1cb",
                    width: "60px",
                    borderRadius: "99px",
                    textAlign: "center",
                    fontSize: "16px",
                    lineHeight: "22px",
                    alignItems: "center",
                    "&.Mui-focused": {
                      color: "#904118",
                    },
                  }}
                >
                  區域
                </InputLabel>
                <Select
                  className={`${s.tag} ${s.areasTag} ${
                    selectedAreas.length > 0 ? s.active : ""
                  }`}
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selectedAreas}
                  onChange={handleChange}
                  input={<OutlinedInput label={district.label} />}
                  renderValue={(selected) =>
                    selected
                      .map(
                        (id) =>
                          districtLabels.find((district) => district.id === id)
                            ?.label
                      )
                      .join(", ")
                  }
                  sx={{
                    width: "150px",
                    // height: "100px",
                    borderRadius: "0",
                    color: "#fff1cb",
                    transition: "0.2s background-color ease-in",
                    "&.Mui-focused": {
                      borderColor: "#fff1cb",
                      outline: "none",
                    },
                    "&:hover": {
                      backgroundColor: "#9e4a1d",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                  MenuProps={menuProps}
                >
                  {districtLabels.map((district) => (
                    <MenuItem
                      key={district.id}
                      value={district.id}
                      sx={{
                        backgroundColor: "#904118",
                        color: "#fff1cb",
                        "&:hover": {
                          backgroundColor: "#a84f1f",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "#c55d24", // 選中且滑過的背景色
                        },
                        "&.Mui-selected": {
                          backgroundColor: "#b35320", // 選中時的背景色
                          color: "#fff",
                        },
                      }}
                    >
                      <Checkbox
                        checked={selectedAreas.includes(district.id)}
                        sx={{
                          color: "#fff",
                          "&.Mui-checked": {
                            color: "#fff1cb", // checkbox color
                          },
                        }}
                      />
                      <ListItemText primary={district.label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* </div> */}
            </div>
            {allTags.map((tag) => (
              <button
                key={tag.id}
                className={`${s.tag} ${
                  selectedTags.includes(tag.id) ? s.active : ""
                }`}
                onClick={() => toggleTag(tag.id)}
              >
                {tag.zh}
                {selectedTags.includes(tag.id) ? (
                  <div className={s.cross}>
                    <img src={cross} alt="" />
                  </div>
                ) : (
                  ""
                )}
              </button>
            ))}
          </div>
          <div className={s.content}>
            <div className={s.cards}>
              {displayFilter.map((cafe, index) => (
                <CafeCard
                  key={index}
                  title={cafe.name_zh}
                  desc={cafe.description}
                  rating={cafe.rating}
                  img={`${cafe.district_id}_${cafe?.id}_1`}
                  cafe={cafe}
                  displayFilter={
                    selectedAreas.length === 0 && selectedTags.length === 0
                      ? []
                      : displayFilter
                  }
                />
              ))}
            </div>
            <div className={s.map}>
              <CafeMap filtered={displayFilter} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default District;
