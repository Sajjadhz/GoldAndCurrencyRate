function getApi(param) {
  let promise = new Promise((resolve, reject) => {
    $("#loader").show();
    $.ajax({
      type: "GET",
      url: "https://currency.jafari.li/json",
      success: function (response) {        
        resolve(response);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
  return promise;
}

function getData() {
  getApi()
    .then((data) => {
      var obj = JSON.parse(data);
      //console.log(obj)
      addDataTime(obj.LastModified);
      showDataCurrency(obj.Currency);
      showDataGold(obj.Gold);
    })
    .catch((err) => {
      console.log(err);
    });
}

function addDataTime(dateTime) {
  $("#dateTime").html(dateTime);
}

function showDataCurrency(listView) {
  for (obj of listView) {
    $("#list-currency").append(
      `<li class="list-group-item list-group-item-action">
        <div class="row">
          <div class="col"><span class="text-info">Currency:</span> ${obj.Currency}</div>
          <div class="col border-left"><span class="text-info">Sell:</span> ${obj.Sell}</div>
          <div class="col border-left"><span class="text-info">Buy:</span> ${obj.Buy}</div>
        </div>
      </li>`
    );
  }
}

function showDataGold(listView) {
  for (obj of listView) {
    $("#list-gold").append(
      `<li class="list-group-item list-group-item-action">
        <div class="row">
          <div class="col"><span class="text-info">Coin:</span> ${obj.Coin}</div>
          <div class="col border-left"><span class="text-info">Sell:</span> ${obj.Sell}</div>
          <div class="col border-left"><span class="text-info">Buy:</span> ${obj.Buy}</div>
        </div>
      </li>`
    );
  }
}

setInterval(getData(), 500);
