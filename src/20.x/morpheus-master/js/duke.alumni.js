console.log('duke.alumni.js');
dukeWatchForPasystemLoad(".Mrphs-siteHierarchy .Mrphs-hierarchy--siteName");
dukeWatchForPASystemOnScroll(".Mrphs-siteHierarchy .Mrphs-hierarchy--siteName");

if (typeof portal.siteTitle !== 'undefined'){
    let dukeSiteTitle = `<span class="Duke-headerlogo--siteTitle">${portal.siteTitle}</span>`;
    document.getElementById('mastLogin').insertAdjacentHTML('beforebegin',dukeSiteTitle);

}
