# organic-dna-resolvereferences

Resolves DNA `@branch.property` as references

## example

    var dna = {
      "branch": {
        "property": "value"
      },
      "otherBranch": {
        "propertyValueReference": "@branch.property",
        "wholeBranch": "@branch"
      }
    }

    var resolveReferences = require("organic-dna-resolvereferences")
    resolveReferences(dna)

    console.log(dna.otherBranch.propertyValueReference) // == "value"
    console.log(dna.otherBranch.wholeBranch.property) // == "value"