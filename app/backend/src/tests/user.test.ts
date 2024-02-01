import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import SequelizeUser from "../database/models/user.model";
import { mockedLoginBody, mockedUser } from "./mocks/user.mock";
import JWT from "../utils/tokenValidation";
import Validations from "../middlewares/Validations";

chai.use(chaiHttp);

const { expect } = chai;

describe("USER TEST", () => {
  beforeEach(function () {
    sinon.restore();
  });

  it("should return a token when login is done", async function () {
    sinon.stub(SequelizeUser, "findOne").resolves(mockedUser as any);
    sinon.stub(JWT, "sign").returns("validToken");
    sinon.stub(Validations, "validateLogin").returns();

    const { status, body } = await chai
      .request(app)
      .post("/login")
      .send(mockedLoginBody);

    expect(status).to.equal(200);
    expect(body).to.have.key("token");
  });
});
