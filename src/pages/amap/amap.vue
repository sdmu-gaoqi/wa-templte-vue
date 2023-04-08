<template>
  <div class="wrapper">
    <div id="container"></div>
    <div id="panel"></div>
    <div id="myPageTop">
      <table>
        <tr>
          <td>
            <label>请输入关键字：</label>
          </td>
        </tr>
        <tr>
          <td>
            <input id="tipinput" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

const onComplete = () => {};

const onError = () => {};

onMounted(() => {
  var map = new AMap.Map("container", {
    resizeEnable: true,
    zoom: 13, //地图显示的缩放级别
    center: [116.397428, 39.90923], //地图中心点
  });
  AMap.plugin(
    [
      "AMap.Geolocation",
      "AMap.Scale",
      "AMap.ToolBar",
      "AMap.ControlBar",
      "AMap.PlaceSearch",
      "AMap.AutoComplete",
    ],
    function () {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：5s
        buttonPosition: "RB", //定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
      });
      var scale = new AMap.Scale();
      var tool = new AMap.ToolBar({
        position: {
            left: '20px',
            bottom: '100px'
        },
      });
      var controlBar = new AMap.ControlBar({
        position: {
            top: '100px'
        }
      });
      map.addControl(geolocation);
      map.addControl(scale);
      map.addControl(tool);
      map.addControl(controlBar);

      var autoOptions = {
        input: "tipinput",
      };

      var auto = new AMap.AutoComplete(autoOptions);
      var placeSearch = new AMap.PlaceSearch({
        map: map,
      }); //构造地点查询类
      auto.on("select", select); //注册监听，当选中某条记录时会触发
      function select(e) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name); //关键字查询查询
      }

      var driving = new AMap.Driving({
        map: map,
        panel: "panel",
      });
      // 根据起终点经纬度规划驾车导航路线
      driving.search(
        new AMap.LngLat(116.379028, 39.865042),
        new AMap.LngLat(116.427281, 39.903719),
        function (status, result) {
          // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
          if (status === "complete") {
            console.log("complete");
          } else {
            console.log("error", result);
          }
        }
      );

      geolocation.getCurrentPosition(function (status, result) {
        if (status == "complete") {
          onComplete(result);
        } else {
          onError(result);
        }
      });
    }
  );
});
//构造路线导航类
// var driving = new AMap.Driving({
//   map: map,
//   panel: "panel",
// });
// // 根据起终点名称规划驾车导航路线
// driving.search(
//   [
//     { keyword: "北京市地震局(公交站)", city: "北京" },
//     { keyword: "亦庄文化园(地铁站)", city: "北京" },
//   ],
//   function (status, result) {
//     // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
//     if (status === "complete") {
//       log.success("绘制驾车路线完成");
//     } else {
//       log.error("获取驾车数据失败：" + result);
//     }
//   }
// );
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  #container {
    width: 100%;
    height: 100%;
  }
  #myPageTop {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
  }
  #panel {
    width: 200px;
    position: absolute;
    z-index: 999;
    right: 0;
    top: 0;
    height: 500px;
    overflow: hidden scroll;
  }
}
</style>
