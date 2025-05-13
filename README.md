# raw-material-calculator
This was a project created for a 305 Hackathon

## API
To build the api you will need to export below environment variables
- SPRING_DATASOURCE_PASSWORD

### Generate PEM for signing JWT
- [Video Dan Vega - JWT Spring Security](https://youtu.be/KYNR5js2cXE)

#### Commands
1. Generating Keypair
```bash
openssl genrsa -out keypair.pem 2048
```
2. Export Public Key
```bash
openssl rsa -in keypair.pem -pubout -out public.pem
```
3. 
```bash
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out private.pem
```

