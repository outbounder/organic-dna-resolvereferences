describe("resolve references", function(){
  it("resolve as per example", function(){
    var dna = {
      "branch": {
        "property": "value"
      },
      "otherBranch": {
        "propertyValueReference": "@branch.property",
        "wholeBranch": "@branch"
      }
    }

    var resolveReferences = require("../index")
    resolveReferences(dna)

    expect(dna.otherBranch.propertyValueReference).toBe("value")
    expect(dna.otherBranch.wholeBranch.property).toBe("value")
  })
})