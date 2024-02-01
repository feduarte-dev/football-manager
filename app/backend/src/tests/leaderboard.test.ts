import { App } from "../app";
import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import SequelizeMatches from "../database/models/matches.model";
import SequelizeTeam from "../database/models/teams.model";
import { mockedLeaderboard, mockedLeaderboardAway, mockedLeaderboardHome } from "./mocks/leaderboard.mock";
import { mockedMatches } from "./mocks/matches.mock";
import { mockedTeams } from "./mocks/teams.mock";

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe("LEADERBOARD TEST", function () {
  beforeEach(function () {
    sinon.restore();
  });

  it("Should return only home teams", async function () {
    sinon.stub(SequelizeMatches, "findAll").resolves(mockedMatches as any);
    sinon.stub(SequelizeTeam, "findAll").resolves(mockedTeams as any);

    const { status, body } = await chai.request(app).get("/leaderboard/home");

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockedLeaderboardHome);
  });

  it("Should return only away teams", async function () {
    sinon.stub(SequelizeMatches, "findAll").resolves(mockedMatches as any);
    sinon.stub(SequelizeTeam, "findAll").resolves(mockedTeams as any);

    const { status, body } = await chai.request(app).get("/leaderboard/away");

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockedLeaderboardAway);
  });
  it("Should return all teams", async function () {
    sinon.stub(SequelizeMatches, "findAll").resolves(mockedMatches as any);
    sinon.stub(SequelizeTeam, "findAll").resolves(mockedTeams as any);

    const { status, body } = await chai.request(app).get("/leaderboard");

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockedLeaderboard);
  });
});
