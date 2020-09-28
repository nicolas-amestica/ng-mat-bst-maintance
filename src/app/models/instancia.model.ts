export class InstanciaModel {
    InstanceId?: string;
    InstanceType?: string;
    Monitoring?: string;
    PrivateDnsName?: string;
    PrivateIpAddress?: string;
    PublicDnsName?: string;
    SubnetId?: string;
    VpcId?: string;
    State?: {
        Code: number,
        Name: string
    };
    Tags?: [{
        Key: string,
        Value: string
    }]
}