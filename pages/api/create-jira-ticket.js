export default async function (req, res) {
  const jiraTicketTitle = req.body.jiraTicketTitle
  const jiraTicketContent = req.body.jiraTicketContent

  const auth = Buffer.from(`${process.env.JIRA_EMAIL + ":" + process.env.JIRA_AUTH_TOKEN}`).toString('base64')
  console.log(auth, 'AUTH')
  const data = {
    "fields": {
      "project": {
        "key": process.env.JIRA_PROJECT_KEY
      },
      "summary": jiraTicketTitle, 
      "description": jiraTicketContent,
      "issuetype": {
        "name": "Task"
      },
      "reporter":{
        "id": process.env.REPORTER_ID
      },
      "customfield_17596": {
        "value": "Maintenance"
      }
    }
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + auth
    },
    // TODO improve format arriving to Jira
    body: JSON.stringify(data)
  };

 

  try {
    const response = await fetch(process.env.JIRA_BASE_URL + '/rest/api/2/issue', options);
    // const json = await response.json();
    console.log(response)
    // console.log(json, 'JSON');
  } catch (error) {
    console.log(error);
  }

}

