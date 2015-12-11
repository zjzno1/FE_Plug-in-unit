/**
 * @author 极昼空间
 * @E-mail abbottzjz@gmail.com 
 * @github https://github.com/zjzno1
 * 这是本人大二时候写的百度地图js代码，
 * 主要实现了坐标点得链接与在相应点上点击出现图片
 * 代码中注释相对较全
 */
//百度地图
function baiduditu(xmlurl,json_mement,div)
{
	//////////////把json——mement（覆盖物，也就是标点）的经纬度取出来////////////////////////////////
	 var sz = new Array();
     var sz2=new Array(new Array(),new Array());
     for(var i = 0;i<json_moment.length;i++)
	{
		sz[i] = json_moment[i].coordinate;
		sz2[i] = sz[i].split(",");
	}

	var jd1 = new Array();
	var wd1 = new Array();
	for(var i = 0;i<json_moment.length;i++)
	{
		 jd1[i] = parseFloat(sz2[i][0]);////标点的经度
		 wd1[i] = parseFloat(sz2[i][1]);////标点的纬度
	}
//////////////////获取路线的经纬度////////////////////////
	var xmlPath =xmlurl;
    if(xmlPath !="")
	{
			lat1 = [];
			lon1 = [];
			$.ajax({  
				url:xmlurl,
				dataType:"xml",  
				success:function(data)
				{  
					$(data).find("item").each(function()
					{
						  var lon = $(this).attr("lon");
						  var lat = $(this).attr("lat");
						  if(lon !="" && lat !="")
						  {
						      try{
								  lat1.push(lat);
								  lon1.push(lon); 
							  }catch(e){}
						  }
					}); 
	var jd = new Array();
	var wd = new Array();
	for(var i = 0;i<lat1.length;i++)
	{
		 jd[i] = parseFloat(lon1[i]);////折现点的经度
		 wd[i] = parseFloat(lat1[i]);////折现点的纬度
	}
//////////////////////////////////////////google坐标（火星坐标）转换百度坐标///////////////////////////////////////
/////////////覆盖物坐标转换/////////////////////////////////////////////
    var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
	var bd_lon1 = new Array();
	var bd_lat1 = new Array();  
	for(var i = 0;i<lat1.length;i++)
	{
	    var x = jd1[i];
		var y = wd1[i];
	    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
	    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
	    bd_lon1[i] = z * Math.cos(theta) + 0.0065;
	    bd_lat1[i] = z * Math.sin(theta) + 0.006;
	}
	//////////////////////折线坐标转换，同时确定百度地图一系列值/////////////////////////////////////////////////	
	var bd_lon = new Array();
	var bd_lat = new Array();
	var maxj=0;//最远点到中心经度的水平距离
	var maxw=0;//最远点到中心纬度的竖直距离
	var zdj = 0;//折线点的最大经度
	var zdw = 0;//折线点的最大纬度
	var zxj =1000;//最小经度
	var zxw =1000 ;//最小纬度
	var cd;//地图级别
	var zhongj;//中心经度
	var zhongw;//中心纬度（确定地图位置时用）
	var h;//折线的高
	var w;//折线的宽
/////////////折线坐标转换//////////////////////////////////////////
	for(var i = 0;i<lat1.length;i++)
	{
	    var x = jd[i];
		var y = wd[i];
	    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
	    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
 	    bd_lon[i] = z * Math.cos(theta) + 0.0065;
 	    bd_lat[i] = z * Math.sin(theta) + 0.006;
	}
//////////////////////确定中心点及h,w的值/////////////////////////////////////  
    for(var i =0 ;i<bd_lon.length;i++)
	{
		 if(zdj<(bd_lon[i]))
	      zdj = bd_lon[i];
	}
	for(var i =0 ;i<bd_lon.length;i++)
	{
		 if(zdw<bd_lat[i])
	      zdw = bd_lat[i];
	}
	for(var i =0 ;i<bd_lon.length;i++)
	{
		 if(zxj>bd_lon[i])
	      zxj = bd_lon[i];
	}
	for(var i =0 ;i<bd_lon.length;i++)
	{
		 if(zxw>bd_lat[i])
	      zxw = bd_lat[i];
	}
	 zhongj = ((zdj+zxj)/2);
	 zhongw = ((zdw+zxw)/2);
	 h = zdj-zxj;
	 w = zdw-zxw;
////////////////////////////////////////////////////////////////////
///////////////////确定地图大小,具体用法参考百度地图api的setZoom和getBounds（）//////////////////////////////////////////////
	var cd = 18;	//给地图级别赋初值18，即地图最大级别
	map = new BMap.Map(allmap,{enableMapClick:false}); 
//enableMapClick（boolean）	
//	var map = new BMap.Map(allmap);
	var point = new BMap.Point(zhongj,zhongw);
	map.centerAndZoom(point, cd);
	 var w1 =map.getBounds().getSouthWest().lng;
     var w2 =map.getBounds().getSouthWest().lat;
     var w3 =map.getBounds().getNorthEast().lng;
	 var w4 =map.getBounds().getNorthEast().lat;
	 while(h>w3-w1||w>w4-w2)
	 {
	 var w1 =map.getBounds().getSouthWest().lng;
     var w2 =map.getBounds().getSouthWest().lat;
     var w3 =map.getBounds().getNorthEast().lng;
	 var w4 =map.getBounds().getNorthEast().lat;
		 map.setZoom(cd);
		 		 cd=cd-1;
	 }
//////////////////////////////////////////////////////////////////////
     map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));  //百度地图控件，右上角，仅包含平移和缩放按钮
////////////////////画出折现/////////////////////////////////////////
	var x1 = new Array();

	var x;
	var y;

	for (var i = 0; i < lat1.length; i++)
	 {
		x = bd_lon[i];//经度
		y = bd_lat[i];//纬度
		x1[i] = new BMap.Point(x,y);	

       }
var polyline = new BMap.Polyline(x1, {strokeColor:"blue", strokeWeight:3, strokeOpacity:0.5});
map.addOverlay(polyline); 
///////////////////////////画出点并添加图片//////////////////////////////////////////////////////
function addpic(point,aa1){  
    var sContent =aa1;
	var marker = new BMap.Marker(point);
    map.addOverlay(marker);
	var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
	marker.addEventListener("click", function(){          
    this.openInfoWindow(infoWindow);
    //图片加载完毕重绘infowindow
    document.getElementById('id').onload = function ()
	{
         infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
  	 
	}
	
});
}
function addMarker(point)
{
     var marker = new BMap.Marker(point);
     map.addOverlay(marker);
}
var aa = new Array();
var aa1 = new Array();
var id = new Array();
for (var i = 0; i <json_moment.length; i ++)
{
    var point = new BMap.Point(bd_lon1[i], bd_lat1[i]);
    addMarker(point);
	id = i;
    aa[i] = json_moment[i].imagepath;
    aa1[i] = "\"<img id='id' src=\'"+aa[i]+"\' />";
	//document.write(aa[i]+"<br>");
    addpic(point,aa1[i]);
}


				},
			}); 
		}

}