// console.log('duke.pratt.js');

if (typeof portal.siteTitle !== 'undefined'){
    let dukeSiteTitle = `<span class="Duke-headerlogo--siteTitle">${portal.siteTitle}</span>`;
    document.getElementById('mastLogin').insertAdjacentHTML('beforebegin',dukeSiteTitle);

}
