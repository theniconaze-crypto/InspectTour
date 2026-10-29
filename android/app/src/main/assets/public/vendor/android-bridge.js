/* Pont Android : export Excel via partage natif, impression PDF via PrintManager */
(function () {
  var cap = window.Capacitor;
  var native = !!(cap && cap.isNativePlatform && cap.isNativePlatform());
  if (!native) return;

  // --- Impression / PDF : délégué au service d'impression Android ---
  window.print = function () {
    if (window.AndroidPrint && window.AndroidPrint.print) window.AndroidPrint.print();
    else alert("Impression indisponible sur cet appareil.");
  };

  // --- Export Excel : écriture dans le cache puis feuille de partage ---
  var origWriteFile = XLSX.writeFile;
  XLSX.writeFile = function (wb, filename) {
    try {
      var b64 = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
      var Fs = cap.Plugins.Filesystem, Sh = cap.Plugins.Share;
      Fs.writeFile({ path: filename, data: b64, directory: 'CACHE' })
        .then(function (r) { return Sh.share({ title: filename, url: r.uri, dialogTitle: 'Enregistrer / envoyer le fichier Excel' }); })
        .catch(function (e) { console.error(e); alert("Échec de l'export Excel : " + (e && e.message ? e.message : e)); });
    } catch (e) {
      console.error(e);
      origWriteFile.apply(XLSX, arguments);
    }
  };
})();
