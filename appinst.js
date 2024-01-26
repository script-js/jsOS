function addapp(aurl,aatitle,imgurl,ico_appid,svg) {
  if (ico_appid) {
    var toaddpre = "new WIN('(link)[" + aurl + "]', '(icn)[" + imgurl + "]', '(title)[" + aatitle + "]', '(os)[true]', '(full)[false]', '(appname)[" + ico_appid + "]');";
  } else {
    var toaddpre = "new WIN('(link)[" + aurl + "]', '(icn)[" + imgurl + "]', '(title)[" + aatitle + "]', '(os)[true]', '(full)[false]', '(appname)[" + aatitle + "]');";    
  }
  if (svg) {
    var toadd = localStorage.getItem("capps") + '<div class="deskapp" title="' + aatitle + '" onclick="' + toaddpre + '" xmlns="http://www.w3.org/2000/svg">' + svg + '</div>'
 } else {
    var toadd = localStorage.getItem("capps") + '<div class="deskapp" title="' + aatitle + '" onclick="' + toaddpre + '" xmlns="http://www.w3.org/2000/svg"><img width="38px" src=' + imgurl + '></div>'
 }
  var ta2 = localStorage.getItem("appremlist") + "<div name='" + aatitle + "' style='width:100%'><img style='float:left' width='38' src='" + imgurl + "' />&nbsp;<span style='float:left'>" + aatitle + "</span><button class='btn'  id='" + aatitle + "' onclick='removeApp(this.id)' style='float:right'>Uninstall</button></div><p>&nbsp;</p>"
  localStorage.setItem("capps",toadd.replace("null",""))
  localStorage.setItem("appremlist",ta2.replace("null",""))
  alert("The app has been installed. Restart Terbium (Menu > Power Button) to see changes.")
  console.log("DebugInfo:" + aatitle + imgurl + aurl + " | " + toadd + " | " + ta2)
}

function removeApp(appid) {
        var apptext = document.getElementById(appid).parentElement.innerHTML;
        var acon2 = confirm("Are you sure you want to uninstall this app?")
        if (acon2 == true) {
          var tr1 = localStorage.getItem("appremlist").replace(apptext,"").replace("name='" + appid + "'","style='display:none'")
          var tr2 = localStorage.getItem("capps").replace('title="' + appid + '"',"style='display:none'")
          localStorage.setItem("capps",tr2)
          localStorage.setItem("appremlist",tr1)
          alert("App has been uninstalled. Restart Terbium (Menu > Power Button) to see changes.")
        }
        location.reload()
}

if (localStorage.getItem("appremlist").includes("display:none")) {
        if (localStorage.getItem("capps").includes("title=")) {
                console.log("Apps in use, cannot delete")
        } else {
          localStorage.setItem("appremlist","")
          localStorage.setItem("capps","")
          console.log("Simplified installed apps string.")
        }
}
