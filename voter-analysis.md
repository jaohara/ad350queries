# Final Lab - Very Irate Prawns

## Voter Analysis

This portion of our final lab will cover the ways in which we will make queries on the voterbase to get analyses and conclusions on their voting patterns. From data like this, we could extrapolate trends based on certain demographics, as well as consider the extent to which the votes cast were influenced by outside factors. Larger-scale pictures of the voting trends such as this will allow us to extract information about which parts are the most vulnerable to influence from outside voter manipulation. 


## Assuming this Setup

There are a few assumptions that these examples make about model schemas already being written, result sets already queried, as well as a few helper functions being defined:

```javascript
import Mongoose from "mongoose";
import { candidateModel, partyModel, voteModel, voterModel } 
  from "./models/models.js";

const candidates = candidateModel.find();
const parties = partyModel.find();
const votes = voteModel.find().sort('-date'); // assuming votes have a "date" field
const voters = voterModel.find();

const demographics = [[18,29], [30,44], [45,64], [65,undefined]];
const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];


const yearsBeforeNow = (years) => {
  let current = new Date();  
  current.setFullYear(current.getFullYear() - (years !== undefined ? years : 150));
  return current;
};

// Gets the party of the most recent vote for a voter
const getVoteParty = (voter) => {
  let candidate, voteParty;

  let vote = votes.find(vote => vote.voter_id === voter.id);
  let candidate = getCandidateFromVote(vote);
  let voteParty = 
  
  if (candidate !== undefined) 
    voteParty = parties.find(party => party.name === candidate.party_name);

  return voteParty;
};

// Gets the candidate from a given vote
const getCandidateFromVote = (vote) =>
  vote === undefined ? undefined :
  candidates.find(candidate => candidate.id === vote.candidate_id);

// Gets the party from a given candidate's ticket
const getPartyFromCandidate = (candidate) =>
  candidate === undefined ? undefined : 
  parties.find(party => party.name === candidate.party_name);

// Gets a tally of democrat, republican, and other party votes for a collection of Voters
const getPartyCount = (voterbase) => {
  let partyCount = { "democrat": 0, "republican": 0, "other": 0 };
        
  voterbase.forEach(voter => {
    let voteParty = getVoteParty(voter);
    
    if (voteParty !== undefined) {
      let partyIndex = voteParty.toLowerCase();
      partyIndex = Object.keys(partyCount).includes(partyIndex) ? partyIndex : "other";
      partyCount[partyIndex]++;
    }
  });

  return partyCount;
};
```


## Query Users by Age

```javascript
const getPartyRepresentationByAge = () => {
  const results = [];
  
  demographics.forEach(([ low, high ]) => {
    voterModel.find({ age: { $gte: yearsBeforeNow(low), $lt: yearsBeforeNow(high) } })
      .then(queryResult => getPartyCount(queryResult))
      .then(partyCount => results.push({
        ages: [low, high],
        voteCount: partyCount 
      }));
  });

  /*
    'results' should now resemble this:

    [
      {
        ages: [18, 29],
        voteCount: {
          "democrat": 7,
          "republican": 1,
          "other": 2
        }
      },
      {
        ages: [30, 44],
        voteCount: {
          "democrat": 5,
          "republican": 4,
          "other": 1
        }
      },
      // ...
    ]
  */
  
  return results;
};
```

- Different Age Brackets
  - Stacked bar graph chart to show Dems/Reps for each
- Per-Candidate Pie Charts with percentage of total vote from each age bracket

## Query Users by Region and Age


```javascript
const getPartyRepresentationByAgeAndRegion = () => {
  const results = [];

  demographics.forEach(([ low, high ]) => {
    let resultObject = {
      ages: [low, high],
      states: [],
    };

    states.forEach(state => {
      voterModel.find({ 
          age: { $gte: yearsBeforeNow(low), $lt: yearsBeforeNow(high) },
          state: state 
        })
        .then(queryResult => getPartyCount(queryResult))
        .then(partyCount => resultObject.states.push({
          state: state,
          voteCount: partyCount
        }));
    });

    results.push(resultObject);
  });


  /*
    'results' should now resemble this:

    [
      {
        ages: [18, 29],
        states: [
          {
            state: "Alabama",
            voteCount: {
              "democrat": 1,
              "republican": 2,
              "other": 0
            }
          },
          {
            state: "Alaska",
            votecount: {
              "democrat": 1,
              "republican": 1,
              "other": 1
            }
          },
          // ...
        ]
      },
      {
        ages: [30, 44],
        states: [
          {
            state: "Alabama",
            voteCount: {
              // ...
            }
          }, 
          // ...
        ]
      }, 
      // ...
    ]
  */

  return results;
};
```

- Get US Map with demographics at different age ranges 
  - Could probably simulate this result on the slides with some queries + maps from previous elections (five thirty eight?)

## Query to Return Votes from Users who have voted for more than one Party

```javascript
const getMultiPartyVoterTrends = () => {
  const results = [];

  voters.forEach(voter => {
    let partiesVoted = [];
    
    votes.forEach(vote => {
      if (vote.voter_id === voter.id) {
        let candidate, voteParty;

      }
      vote.voter_id === voter.id && !partiesVoted.includes()
    })
  });

  return results;
};
```
