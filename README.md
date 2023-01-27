# Create Jira Tickets with ChatGPT



Application Created on top of  the OpenAI API [quickstart tutorial](https://beta.openai.com/docs/quickstart). It uses the [Next.js](https://nextjs.org/) framework with [React](https://reactjs.org/). Check out the tutorial or follow the instructions below to get set up.

1) yarn install

2) Rename .env.example to .env and populate the variables.

3) yarn build && yarn start

4) Type a ticket title for a React component.

E.g.  'Create Card component for Newskit Design System.' or...  'Create Card component'.


## ATTENTION

The Jira API call might fail. This depends by how your Jira software is set up. Ticket creation in your website might require extra custom fields, or information. So, the body of the request may need to change. I would suggest you to remove the custom field I have added, it is very specific to my Jira workspace.