export const PUBLIC_RESEARCH_ARCHIVE_URL =
  'https://github.com/gabriel232ch/candidate-information-research';

export interface InquiryChapter {
  id: string;
  heading: string;
  questionBefore: string;
  evidenceOrProblem: string;
  reframe: string;
  body: readonly string[];
  archiveHref?: string;
}

export interface InquiryTransition {
  id: string;
  afterChapterId: string;
  heading: string;
  body: readonly string[];
}

export interface SystemizationNode {
  id: string;
  afterChapterId: string;
  heading: string;
  body: readonly string[];
  archiveHref: string;
}

export interface InquiryFinding {
  observation: string;
  scope: string;
  archiveHref: string;
}

const timelineUrl = `${PUBLIC_RESEARCH_ARCHIVE_URL}/blob/main/PROJECT_TIMELINE.md`;
const methodUrl = `${PUBLIC_RESEARCH_ARCHIVE_URL}/blob/main/METHOD_EVOLUTION.md`;
const smallCompanyResearchUrl =
  `${PUBLIC_RESEARCH_ARCHIVE_URL}/blob/main/research/01_smaller_high_impact_companies/public_synthesis.md`;
const caseStudyUrl =
  `${PUBLIC_RESEARCH_ARCHIVE_URL}/blob/main/research/02_employer_brand_case_studies/cross_case_synthesis.md`;
const evaluationUrl =
  `${PUBLIC_RESEARCH_ARCHIVE_URL}/blob/main/methods/evaluation_design.md`;

export const SMALLER_COMPANIES_INQUIRY = {
  title: 'Why Do Some People Choose Smaller Companies?',
  dek: 'An inquiry into AI visibility became a question about the information candidates need to decide—and the evidence companies can make easier to inspect.',
  opening:
    'I started by asking how AI described a company. Over roughly six weeks, that question kept changing.',
  chapters: [
    {
      id: 'geo',
      heading: 'I first thought this was a GEO problem',
      questionBefore:
        'Would relevant AI answers mention the company, describe it accurately, and surface the facts it wanted candidates to know?',
      evidenceOrProblem:
        'I was new to GEO. I learned through practical examples and research, then ran an exploratory prompt test about mentions, descriptions, and the information shaping the answers.',
      reframe:
        'The early test was a way to learn what to investigate. It was not a clean numerical baseline.',
      body: [
        'I used AI-assisted orientation, practical examples, and authoritative research to build an initial model of GEO before testing it.',
        'The exploratory test asked what AI said about the company, whether those descriptions seemed accurate, and which sources or information appeared to shape the answer. I treated each response as a lead to inspect.',
      ],
      archiveHref: `${timelineUrl}#early-inquiry-geo-and-information-quality`,
    },
    {
      id: 'source-truth',
      heading: 'The output problem was partly an upstream information problem',
      questionBefore:
        'If an answer was absent or inaccurate, was the prompt the only thing that needed work?',
      evidenceOrProblem:
        'The early exploration and a review of available company information surfaced facts that were dispersed, inconsistent, or difficult to verify.',
      reframe:
        'Before optimizing what AI said, I needed to understand what information existed, how consistent it was, and which facts could be trusted.',
      body: [
        'The prompt test and the review of available company information pointed in the same direction: output quality was constrained by the information environment upstream.',
        'The work therefore moved from GEO output optimization toward information quality and a more dependable source of truth. This was an accumulation of signals, not a conclusion drawn from one test.',
      ],
      archiveHref: `${timelineUrl}#early-inquiry-geo-and-information-quality`,
    },
    {
      id: 'positioning',
      heading: 'Accurate facts still did not answer why anyone should care',
      questionBefore:
        'If the facts were clear, what might actually make a smaller organization compelling to the people it wanted to attract?',
      evidenceOrProblem:
        'A source of truth could improve consistency, but it could not establish what employees valued or what made a smaller organization compelling.',
      reframe:
        'The inquiry split into employee interviews and comparative research on smaller, high-impact organizations.',
      body: [
        'I began looking both inside and outside the organization. Interviews could help compare public claims with employees’ lived experience; external research could explore how smaller organizations built meaningful impact and attracted specialized talent.',
        'The two directions asked different questions, but both challenged the assumption that a sharper positioning statement would be enough.',
      ],
      archiveHref: smallCompanyResearchUrl,
    },
    {
      id: 'reality',
      heading: 'A better story could not substitute for a stronger reality',
      questionBefore:
        'Could a clearer story make a company compelling if the underlying work and organization did not support it?',
      evidenceOrProblem:
        'The selected smaller organizations appeared compelling through capabilities, visible output, specialized leverage, reputation, or talent density—not narrative alone.',
      reframe:
        'Brand could amplify organizational reality, but the research did not support treating it as a substitute or a universal causal formula.',
      body: [
        'The comparison made me less confident in a positioning-first explanation. The organizations studied had concrete strengths that candidates could inspect, such as technical capability, visible output, or a focused operating model.',
        'I began to think about attraction as part of a longer relationship between organizational reality, employee experience, reputation, and future output. That was a working pattern from selected cases, not a universal loop.',
      ],
      archiveHref: smallCompanyResearchUrl,
    },
    {
      id: 'information-gap',
      heading: 'The interviews exposed an information-gap problem',
      questionBefore:
        'What had people wanted to know before they decided whether a role was worth pursuing?',
      evidenceOrProblem:
        'Interview evidence suggested that some people had lacked useful information about the real work, role expectations, work style, or internal environment before joining.',
      reframe:
        'Employee stories could help future candidates inspect reality and reduce avoidable information gaps.',
      body: [
        'Some interview evidence suggested that clearer job information had helped people decide whether to apply. These accounts are not representative of every employee or candidate.',
        'That changed the role of employee content in my mind. It was not only a way to prove a positioning; it could offer evidence that helps someone understand what a role may actually involve.',
      ],
    },
    {
      id: 'query',
      heading: 'If people search with questions, structure the content around questions',
      questionBefore:
        'How should the information be organized around the uncertainties candidates actually express?',
      evidenceOrProblem:
        'Candidates ask about specific concerns; an employee-story format does not necessarily answer those questions directly.',
      reframe:
        'The content unit shifted from an employee story to a candidate question supported by employee evidence.',
      body: [
        'I organized the content logic as Candidate Query → Direct Answer → Employee Evidence → Full Story.',
        'That structure starts with the question a candidate is trying to resolve, then uses employee evidence to make the answer more concrete. The private interview material and story text remain private.',
      ],
      archiveHref: methodUrl,
    },
    {
      id: 'evaluation',
      heading: 'Creating content was not enough; I needed to evaluate what models surfaced',
      questionBefore:
        'After making candidate-query-oriented content, what would models actually mention, cite, omit, or still fail to answer?',
      evidenceOrProblem:
        'The later baseline followed employee interviews, query-oriented content design, Golden Samples, a reusable writing process, and six story drafts.',
      reframe:
        'The evaluation tested a later content stage and had a different purpose from the early exploratory GEO test.',
      body: [
        'Once six story drafts existed, the question was no longer simply whether AI could mention the company. I wanted to inspect what answers surfaced, cited, omitted, or could not verify.',
        'This later structured evaluation used multiple prompts and platforms. Its raw dataset remains private, and the observations are a diagnostic snapshot rather than proof that the content changed model behavior.',
        'The early GEO exploration and this later query-content evaluation are separate research moments. The early test and information review contributed to the Source-of-Truth shift; the later matrix evaluated candidate-oriented content.',
      ],
      archiveHref: evaluationUrl,
    },
    {
      id: 'case-studies',
      heading: 'A second round of external cases changed the question again',
      questionBefore:
        'How do companies make organizational reality legible enough for a candidate to judge what joining could mean?',
      evidenceOrProblem:
        'A later five-case employer-brand research program asked how evidence about work and organizational mechanisms reaches candidates.',
      reframe:
        'The focus shifted from finding a compelling claim toward making relevant evidence easier to inspect.',
      body: [
        'I kept this five-case study separate from the earlier research on smaller, high-impact organizations. The earlier work asked what made selected organizations compelling; this later set asked how companies made their operating reality legible to candidates.',
        'The five cases were selected as a planned set, not assembled later to disprove earlier work. Their evidence appeared in many places, including research, technical output, open-source work, and operating documentation.',
        'More information did not always make a decision easier. It could still be stale, hard to navigate, inconsistent, or poorly maintained.',
      ],
      archiveHref: caseStudyUrl,
    },
    {
      id: 'decision-support',
      heading: 'The working synthesis moved from persuasion toward decision support',
      questionBefore:
        'Could employer information help candidates judge fit instead of simply encouraging them to join?',
      evidenceOrProblem:
        'The cross-case synthesis made the candidate’s decision context more central, while leaving many choices personal and situational.',
      reframe:
        'A company can make relevant evidence easier to inspect; it cannot decide for a candidate what should matter.',
      body: [
        'I now see a company’s information environment as one part of mutual selection. Candidates can compare real work, role expectations, organizational mechanisms, and employee evidence against what matters to them.',
        'This is a working interpretation of a bounded project, not a general theory of why people choose companies.',
      ],
      archiveHref: `${caseStudyUrl}#working-model`,
    },
    {
      id: 'crossroads',
      heading: 'The learning became a design question',
      questionBefore:
        'What would the experience look like if it started from the decision a candidate was already facing?',
      evidenceOrProblem:
        'A candidate may be weighing several paths and need evidence connected to that context, rather than another broad invitation to join.',
      reframe:
        'The concept starts at a career crossroads and surfaces relevant evidence and comparable lived experience.',
      body: [
        'I explored an interactive concept that begins with the candidate’s decision context, then connects it to relevant evidence and comparable lived experience.',
        'The concept and interactive prototype are complete, and a direction was selected for continued internal work. It has not shipped publicly. It has not been validated through live candidate outcomes.',
      ],
    },
  ] satisfies readonly InquiryChapter[],
  transitions: [
    {
      id: 'first-landing-page',
      afterChapterId: 'evaluation',
      heading: 'The first landing page organized the information, but not the framing',
      body: [
        'The query-based content needed an interface. My first landing-page work organized how candidates could enter, how questions were grouped, and how direct answers related to fuller stories.',
        'That made the material easier to navigate, but it did not yet resolve what the experience should help a candidate decide.',
      ],
    },
  ] satisfies readonly InquiryTransition[],
  systemizationNodes: [
    {
      id: 'golden-samples-to-system',
      afterChapterId: 'query',
      heading: 'Golden Samples became a reusable content process',
      body: [
        'The first article took roughly 2–3 hours of iterative work. As my judgment became clearer, the second and third took roughly 20–30 minutes each within the same working context.',
        'I used those three successful outputs as Golden Samples, then extracted the repeated judgment into a reusable writing process. Human selection, iteration, and review remained part of the method.',
        'After several rounds of refinement, the process could turn source material into usable drafts with little article-level re-teaching. It did not remove the need for human judgment.',
      ],
      archiveHref:
        `${PUBLIC_RESEARCH_ARCHIVE_URL}/blob/main/methods/golden_samples_to_reusable_system.md`,
    },
    {
      id: 'manual-cases-to-harness',
      afterChapterId: 'case-studies',
      heading: 'Repeated case research became a reusable protocol',
      body: [
        'The first case took roughly a day; the second and third took roughly half a day each as the method stabilized. Designing the research harness took most of a working day.',
        'Two later cases were researched in parallel by separate agents and completed in roughly the same hour-plus window. These are approximate process observations, not a formal speedup measurement.',
        'Reuse and scale were the original reasons to build the harness. More consistent execution also made the cases easier to compare and synthesize.',
      ],
      archiveHref:
        `${PUBLIC_RESEARCH_ARCHIVE_URL}/blob/main/methods/manual_cases_to_research_harness.md`,
    },
  ] satisfies readonly SystemizationNode[],
  evaluation: {
    findings: [] as InquiryFinding[],
  },
  currentSynthesis:
    'I now see employer information as a way to reduce information asymmetry and support mutual selection. Companies can make the work, expectations, organizational mechanisms, and relevant evidence easier to inspect. This remains a working interpretation, not a universal theory of why people choose companies.',
  currentDesign:
    'The current design is an interactive crossroads concept with a completed prototype and a direction selected for continued internal work. It has not shipped publicly. It has not been evaluated through live candidate outcomes.',
  closing: 'This is where the question has taken me so far.',
  evidenceLinks: [
    { label: 'Project timeline', href: timelineUrl },
    { label: 'Earlier smaller-company research', href: smallCompanyResearchUrl },
    { label: 'Content process', href: `${PUBLIC_RESEARCH_ARCHIVE_URL}/blob/main/methods/golden_samples_to_reusable_system.md` },
    { label: 'Evaluation design', href: evaluationUrl },
    { label: 'Five-case synthesis', href: caseStudyUrl },
    { label: 'Case-study research protocol', href: `${PUBLIC_RESEARCH_ARCHIVE_URL}/blob/main/methods/manual_cases_to_research_harness.md` },
  ],
} as const;
