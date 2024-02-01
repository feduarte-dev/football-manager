import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import { mockedTeams } from "./mocks/teams.mock";
import SequelizeMatches from "../database/models/matches.model";
import { mockedMatches } from "./mocks/matches.mock";

chai.use(chaiHttp);

const { expect } = chai;

describe("MATCHES TEST", () => {
  beforeEach(function () {
    sinon.restore();
  });

  it("should return all matches", async () => {
    sinon.stub(SequelizeMatches, "findAll").resolves(mockedMatches as any);

    const { status, body } = await chai.request(app).get("/matches");

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockedMatches);
  });

  it("should return a all on going matches", async () => {
    sinon.stub(SequelizeMatches, "findAll").resolves(mockedTeams[2] as any);
    
    const { status, body } = await chai
      .request(app)
      .get("/matches?inProgress=true");

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockedTeams[2]);
  });
});
