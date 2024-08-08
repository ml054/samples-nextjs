import { DocumentStore } from "ravendb";
import { BeerOrder } from "@/db/models";

// Change it to your url and database name

import { fetch as undiciFetch, Agent } from "undici";

const publicKey = `-----BEGIN CERTIFICATE-----
MIIFDTCCAvWgAwIBAgIUZ83b9r44Z0L/OZ2cBUY59psN6m4wDQYJKoZIhvcNAQEN
BQAwKjEoMCYGA1UEAwwfKi5mcmVlLm1hcmNpbnRlc3QucmF2ZW5kYi5jbG91ZDAe
Fw0yNDA2MDMwMDAwMDBaFw0yOTA2MDMwMDAwMDBaMBoxGDAWBgNVBAMMD2ZyZWUu
bWFyY2ludGVzdDCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAJinhWS5
R9I7XP3AikIHHSsLiOkFxyYWkD4/U5ILSvXUP/A193UwMw+qPxs1sQm8BeZ1K5yT
F2L+/vuTz6676TlQgZFkB/jVXHoA25JtxniDj/Lf1nOhDs5b2G/cGOm6fzJYYM1R
BzVvDzA/GmkpPyol2ZXVfHkXTQOPEhgJJJxmn4X23BSvegvlDYIzo+3DdIWFy65w
CbB2Oq71rc/lcLN922ZSQqgbdFtXaxdpCKrXVwIgcpjhG09mVcQ1FvMihFOnVvyC
AYMUZPlvnE0jIiN1f2NlBtYSBscl0ffhOqEMBUElqIco+IcMc513jKel/CeECUfk
HGcnQAVxSb+9xESiAcfaQt1UT0qA9Vd7ikvGI9lETENpLIpJgCVkmTcIrNgieLbz
7e3xLhLdJsO5xIPcMQGJ2V6SLIoUMSpo7FPLv60e7tfy9J1IPglEyAj0QTbrEBos
UQe3MIoIepqP4ONX5oEVUnNXZjfyA4P7QKuYu8q8SAqdYQRo9U+cvUiKmMmfe9CV
DKu0lbPk+w2wWoSHCv44n/pEHEc/mKGXDvnW5eGcd//ehIMx+x5RmrRRBqApKiCV
Smp3VuGCq4idUNdeD9AzDBAhAQOzmq1IxxevimWhU2T8+IRFVAzKYrb+LjcSNUKQ
TIwYoOKlw9gxNrkQU6xRzf5wZyobcsbI1wc7AgMBAAGjOzA5MB8GA1UdIwQYMBaA
FKvpV4cJLesYItxYjOOZ4an/rukeMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMCMA0G
CSqGSIb3DQEBDQUAA4ICAQBjbvpKpO7gcO9TXpat9pbdtMErqK+SfHILqaIm5gZv
psV3b67UtiWYlo2eK+r9HrVU/1WPG8Mee/z5G35Qq2jMspFEVk9ULoKvkVqmw94P
/mQbAgULohDDHviAWG1ptzzsWMNfvWNfu4wtl4RN9rHg8MhWrlqfnrgft1vMQJAg
67PoSRz0T75yDxAwqeyx3HQ+TKYUbOVOP3zOAME9Vj6blA5Age2RzQ8q7plRBUCF
BSVdeqd5kc2e3TmfL69Fft8X33Np8cJLxQYFq0MnB6KfmDejLnSmzwJ7lwJwzOYS
XyUhbT/U4fD1TiTRR8x9wRl41vfv3glr1hLanAHof8ayMVcxkWfmjkctLIUicUrg
XRAAldC53K46ycbZ9510L3rTEVJ84bplISyI6+e4+BM5fd1g2yTABkgKlLrWTn8j
Dlq+73+Y8h9uAhdlSFsP9DymQ2kF4vShqoNash3VdTerz+BRy5U4v0MYzZ+mxyz3
TDvs66ruslkBQSwVmGSGogW/Ea9AniFRGl+rMRJSceNhYEERHMF+UpbQBp3XUgGU
IQ1HO72WRjr0Shzws5pzorZzJxphuQNko1abjMYnVMSHzGPKck9davePkNZksBMb
ySNDLYnnzsp2PoYxAKeqa70fU0YOXJoazYNKVOcQyl4E5PpY/qudvGC9+vGY4jRT
ng==
-----END CERTIFICATE-----`;
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----
`;

const store = new DocumentStore(
    "https://a.free.marcintest.ravendb.cloud/",
    "site",
);

const privateKeyPassword = process.env.PK_PASSWORD;
if (!privateKeyPassword) {
    throw new Error("Please define env variable: " + process.env.PK_PASSWORD);
}

const agent = new Agent({
    connect: {
        cert: publicKey,
        key: privateKey,
        passphrase: privateKeyPassword,
    },
});

store.conventions.customFetch = (a: any, b: any) => {
    return undiciFetch(a, {
        ...b,
        dispatcher: agent,
    });
};

// Avoid class name minification in production build
store.conventions.findCollectionName = constructorOrTypeChecker => {
    if (constructorOrTypeChecker === BeerOrder) {
        return "BeerOrders";
    }

    return constructorOrTypeChecker.name;
}

store.initialize();

export { store };
