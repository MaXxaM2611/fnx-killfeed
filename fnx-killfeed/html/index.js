let kills = [];
let $Container = null;
let $Feed = null;


$(function () {
  $Container = $(".feed");
  $Feed = $(".feed > div").hide();
  window.addEventListener("message", function (event) {
    if (event.data.type === "killfeed") {
      let killer = event.data.killer;
      if (event.data.killer === "") { killer = "No Name" }
      let victim = event.data.victim;
      if (event.data.victim === "") { victim = "No Name" }
      const weapon = event.data.weapon;
      addKill(killer, victim, weapon);
    }
  });
});

const StartKillFeed = () => {
  const killToShow = kills.find((k) => k.shown === false);
  const index = kills.indexOf(killToShow);
  if (killToShow === null || killToShow === undefined || index === -1) {return }
  killToShow.shown = true;
  kills[index] = killToShow;
  kills.splice(index, 1);
  var $FeedNew = $Feed.clone();
  $FeedNew.find(".weapons img:first-child").attr("src", "./images/" + killToShow.weapon + ".png"); 
  $FeedNew.find(".killer").text(killToShow.killer); 
  $FeedNew.find(".victim").text(killToShow.victim);
  $Container.append(
   $FeedNew.show().delay(2000).fadeOut(1000, function () {$(this).remove();})
  );
};


const addKill = (k, v, w) => {
  kills.push({ killer: k, victim: v, weapon: w, shown: false, time: Date.now()});
};

let count = 0;

window.setInterval(() => {
  StartKillFeed();
},450);
