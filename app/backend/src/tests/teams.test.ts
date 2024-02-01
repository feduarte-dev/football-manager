import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import SequelizeTeams from "../database/models/teams.model";
import { mockedTeams } from "./mocks/teams.mock";

chai.use(chaiHttp);

const { expect } = chai;

describe("TEAMS TEST", () => {
  it("should return all teams", async () => {
    sinon.stub(SequelizeTeams, "findAll").resolves(mockedTeams as any);

    const { status, body } = await chai.request(app).get("/teams");

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockedTeams);
  });

  it("should return a team by id", async () => {
    sinon.stub(SequelizeTeams, "findOne").resolves(mockedTeams[0] as any);

    const { status, body } = await chai.request(app).get("/teams/1");

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockedTeams[0]);
  });
});
