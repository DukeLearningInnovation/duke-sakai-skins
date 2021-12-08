
let dukeDashboardStyles = `
#motd {
  border: 1px solid var(--sakai-border-color);
}

#motd-title-block {
    padding: 8px;
    font-weight: 400;
    background: var(--sakai-background-color-2);
}
 #motd-message {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 8px;
    margin-top: 16px;
}
#motd-message .container {
  flex-basis: 33%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 16px;
  padding-left: 15px;
  padding-right: 15px;
  font-weight: 400;
}
@media only screen and (max-width: 800px) {
  #motd-message {
    flex-wrap: wrap;
  }
  #motd-message .container {
    flex-basis: 100%;
  }
}
#motd-message .container p {
  margin: 0 0 16px;
}
#motd-message .container .img-responsive {
  display: block;
  max-width: 100%;
  height: auto;
}
#motd-message .container h3 {
  font-size: 1.8em;
}
#motd-message .container .btn {
  background: var(--button-background);
  color: var(--button-color);
  padding: 7px 16px;
  border-radius: 4px;
  border: 1px solid var(--button-border-color);
  text-decoration: none;
}
#motd-message .container .btn:hover,
#motd-message .container .btn:focus {
  background: var(--button-hover-background);
  color: var(--button-hover-color);
  border: 1px solid var(--button-hover-border-color);
  text-decoration: none;
}
#motd-message .container .btn:active {
  background: var(--button-active-background);
  color: var(--button-active-color);
  border: 1px solid var(--button-active-border-color);
  text-decoration: none;
}
#edit-block {
  display: none;
}
`;

export {dukeDashboardStyles as dukeDashboardStyles};