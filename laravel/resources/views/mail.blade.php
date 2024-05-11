<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Service Order</title>
</head>
<style>
    /* .summary_service {

    } */
</style>

<body>
    <h2>{{$data['title']}}</h2>
    <p><strong>Order Details:</strong></p>
    <ul>
        <li><strong>Order ID:</strong> {{ $data['order']['id'] }}</li>
        <li><strong>Status:</strong>Pending</li>
        <li><strong>Created At:</strong> {{ $data['order']['created_at'] }}</li>
    </ul>
    
    <p><strong>Service Details:</strong></p>
 
    
    <ul>
        <li><strong>Service Name:</strong> {{ $data['service']['name'] }}</li>
        <li><strong>Service Quantity:</strong> {{ $data['order']['quantity'] }}</li>
        <li><strong>Service Cost:</strong> {{ $data['order']['cost'] }}</li>
        <li><strong>Package:</strong> {{ $data['order']['package'] }}</li>
    </ul>
   
   
    <p><strong>Customer Details:</strong></p>
    <ul>
        <li><strong>Name:</strong> {{ $data['address']['name'] }}</li>
        <li><strong>Email:</strong> {{ $data['address']['email'] }}</li>
        <li><strong>Phone Number:</strong> {{ $data['address']['phone_number'] }}</li>
        <li><strong>Location:</strong> {{ $data['address']['location'] }}</li>
        <li><strong>Scheduled Date:</strong> {{ $data['address']['scheduled_date'] }}</li>
    </ul>


</body>

</html>