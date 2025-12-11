import {
  Totp,
  TotpConfig,
  TotpValidateOptions,
  ValidTotpConfig,
  generateSecret,
  generateUrl,
} from "time2fa";

class TOTPManager {
  config: TotpConfig;

  constructor() {
    this.config = { algo: "sha1", digits: 6, period: 30, secretSize: 10 };
  }

  cGenerateKey(email: string) {
    return Totp.generateKey({ issuer: "TEST TOTP", user: email });
  }

  cGenerateSecret() {
    return generateSecret(this.config.secretSize);
  }

  cGenerateUrl(email: string) {
    const secret = this.cGenerateSecret();
    const optional = {
      issuer: "N0C",
      user: email,
      secret: secret,
    };

    return generateUrl(optional, this.config as ValidTotpConfig);
  }

  cVerifyToken(token: string, secret: string) {
    const payload: TotpValidateOptions = {
      passcode: token,
      secret: secret,
    };
    return Totp.validate(payload);
  }
}

const totpManager = new TOTPManager();
export default totpManager;
