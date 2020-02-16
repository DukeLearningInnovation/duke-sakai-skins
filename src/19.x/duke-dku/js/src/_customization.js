(function ($) {
	console.log('duke-dku/_customization.js loaded');

	///////////////////////////////////////////////////
    // Inject HTML into SAM honor pledge 
    ///////////////////////////////////////////////////
    if ( document.querySelector('.Mrphs-sakai-samigo #takeAssessmentForm .honor-container')){
		console.log('issue 193 executing');
        let samHonorPledgeLabel = document.querySelector('.Mrphs-sakai-samigo #takeAssessmentForm .honor-container');
        samHonorPledgeLabel.insertAdjacentHTML('beforebegin', `
        <div class="jumbotron" id="honor-pledge-agreement">
			<div class="container"> 
				<div class="col-xs-12">
					<h4>Duke Kunshan Community Standard</h4>
					<p>Duke Kunshan University (DKU) is a community comprised of individuals from diverse cultures and backgrounds. We are dedicated to scholarship, leadership, and service and to the principles of honesty, fairness, respect, and accountability. Members of this community commit to reflecting upon and upholding these principles in all academic and non-academic endeavors and to protecting and promoting a culture of integrity and trust.</p>
					<p>To uphold the DKU Community Standard</p>
					<ul>
						<li>I will hold myself to the highest standards for honesty, integrity, fairness, and responsibility in my academic and non-academic endeavors</li>
						<li>I will respect other cultures and embrace all forms of diversity</li>
						<li>I will uphold the standards if they are compromised.</li>
					</ul>
				</div>
			</div>
		</div>`);
	} 
	
	///////////////////////////////////////////////////
    // Inject HTML into ASN honor pledge 
    ///////////////////////////////////////////////////
    if ( document.querySelector('.Mrphs-sakai-assignment-grades #honor-pledge-agreement')){
		console.log('issue 193 executing');
        let asnHonorPledgeLabel = document.querySelector('.Mrphs-sakai-assignment-grades #honor-pledge-agreement');
        asnHonorPledgeLabel.insertAdjacentHTML('afterend', `
		<p><strong>Honor Pledge: I will neither give nor receive aid on this assessment.</strong></p>
		`);
    } 
}) ($PBJQ);