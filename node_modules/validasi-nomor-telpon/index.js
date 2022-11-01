module.exports.validasiNomor = function (nomor) {

  var string = nomor.toString().replace(/[ -+]/g,"")
  var awal = string.slice(0, 1);
  var str = string.slice(0, 6);

  if (awal == 0) { // harus memulai dengan 62
    return "awali dengan 62";
  } else if (string.length < 12) { // minimal 12 digit
    return "digit nomor terlalu sedikit";
  } else if (string.length > 16) { // maksimal 16 digit
    return "digit nomor terlalu banyak";
  } else {
    switch (str) {
      case "62811":
      case "62812":
      case "62813":
      case "62821":
      case "62852":
      case "62853":
        return "Telkomsel";

      case "62853":
      case "62814":
      case "62815":
      case "62816":
      case "62855":
      case "62856":
      case "62857":
      case "62858":
        return "Indosat";

      case "62817":
      case "62818":
      case "62819":
      case "62859":
      case "62877":
      case "62878":
      case "62879":
        return "Axiata";

      case "62828":
        return "Sampoerna Telekom / Ceria";

      case "62831":
      case "62838":
        return "Natrindo Telepon Seluler / Axis";

      case "62881":
      case "62882":
        return "Smart Telecom / Smart";

      case "62888":
      case "62889":
        return "Mobile-8 / Fren";

      case "62896":
      case "62897":
      case "62898":
      case "62899":
        return "Three / 3";

      default:
        return "nomor belum terdaftar di module kami";
    }
  }
};
