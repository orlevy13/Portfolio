'use strict';

$('body').ready(onInit())

function onInit() {
  renderProjects();
};

function renderProjects() {
  var projs = getGProjs();
  var strHTML = projs.map(proj => {
    return `<div onclick="renderModal('${proj.id}')" class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${proj.id}-thumbnail.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.name}</h4>
          <p class="text-muted">${proj.title}</p>
        </div>
      </div>`
  });
  $('#portfolio').html(strHTML)
}

function renderModal(projId) {
  var proj = getProjById(projId);
  var strHTML = `<h2 class="bg-light text-dark rounded">${proj.name}</h2>
    <p class="bg-light text-muted rounded">${proj.title}.</p>
    <img class="img-fluid d-block mx-auto" src="img/portfolio/${projId}-full.jpg" alt="">
    <p class="text-primary">${proj.desc}</p>
        <ul class="list-inline text-primary">
            <li>Date: ${proj.publishedAt}</li>
            <li>Client: Threads</li>
            <li>Category: ${proj.labels.join(', ')}</li>
        </ul>
        <a target="_blank" href="${proj.url}" class="btn btn-primary" >Check it out!</a>
        <button class="btn btn-danger" data-dismiss="modal" type="button">
        <i class="fa fa-times"></i>
    Close Project</button>`;

  $('.modal-body').html(strHTML)
}

function onSendEmail() {
  var subject = $('input[name="subject"]').val();
  var body = $('textarea[name="body"]').val();
  window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=orlevy13d@gmail.com&su=${subject}&body=${body}`, '_blank')
}
