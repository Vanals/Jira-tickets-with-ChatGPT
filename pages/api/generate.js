import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const ticketDescription = req.body.ticketDescription || '';
  if (ticketDescription.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid Ticket description",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(ticketDescription),
      temperature: 0.6,
      max_tokens: 2000,
    });
    console.log(completion.data, '🔥')
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(ticketDescription) {
  return `Based on the following description
    
    ${ticketDescription}
  
    Create a Jira ticket text.
    It should contain a title.
    It should contain a Description section. Explaining what needs to be created, why, benefits, use cases.
    It should contain a requirements section. The requirement section should contain which props the ReactJs component might need, their typescript type, and what the component user needs them for.
    
    Should also contain, which HTML tags should the component be composed by, following semantic HTML.
    For each tag specify which HTML attributes they need to function and be accessible based on WCAG 2.0 guidelines.
    Describe what each attribute is for.

    If you have  any extra Accessibility recommendation ad an Accessibility section.
    If you have  any extra SEO recommendation ad an SEO section.

    Add an HTML example of the component based on best practices.
    
    It should contain a design section asking to add the related design and stating that they should be followed to create the component

    It should contain an  Acceptance Criteria section, summarizing what needs to be achieved to consider the ticket done
   
    It should contain a Supporting information section, and fill it in if supporting information are given in the description.
    It should contain a Dependencies section, and fill it in if supporting information are given in the description.


    If is a component what is being requested, bare in mind we write in ReactJS.
`;
}
