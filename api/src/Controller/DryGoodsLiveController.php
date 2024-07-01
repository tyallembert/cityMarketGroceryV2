<?php

namespace App\Controller;

use App\Entity\DryGoodsLive;
use App\Entity\Employee;
use App\Repository\DryGoodsLiveRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\SerializerInterface;

class DryGoodsLiveController extends AbstractController
{
    // This route returns the current days tasks
    #[Route('/dryGoodsLive/today', name: 'dry_goods_live_today')]
    public function today(DryGoodsLiveRepository $repository, SerializerInterface $serializer): JsonResponse{
        // Create a DateTime object for the start of today (00:00:00)
        $startOfDay = new \DateTime('today 04:00:00');

        // Create a DateTime object for the end of today (23:59:59)
        $endOfDay = new \DateTime('today 22:00:00');

        // Use the repository to find tasks with startTime within today's range
        $tasks = $repository->createQueryBuilder('t')
            ->where('t.startTime >= :startOfDay')
            ->andWhere('t.startTime <= :endOfDay')
            ->setParameter('startOfDay', $startOfDay)
            ->setParameter('endOfDay', $endOfDay)
            ->orderBy('t.startTime', 'ASC')
            ->getQuery()
            ->getResult();
        $jsonContent = $serializer->serialize($tasks, 'json', ['groups' => ['dryGoodsLive', 'dryGoodsLive:employee']]);
        return new JsonResponse($jsonContent, 200, [], true);
    }
    // This route takes the data from the POST and creates a new dry goods live object
    #[Route('/dryGoodsLive/new', name: 'create_dry_goods_live')]
    public function createNew(Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator): JsonResponse{
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return new Response('Invalid JSON', 400);
        }

        $employee = $entityManager->getRepository(Employee::class)->find($data['employeeId']);

        $now = new \DateTime('now');

        $task = new DryGoodsLive();
        $task->setEmployeeId($employee);
        $task->setAisle($data['aisle'] ?? '');
        $task->setBoxCount($data['boxCount'] ?? '');
        $task->setToteCount($data['toteCount'] ?? '');
        $task->setStartTime($now);
        $task->setType('NEW');
        $task->setStatus("IN PROGRESS");


        $errors = $validator->validate($task);
        if (count($errors) > 0) {
            return new Response((string) $errors, 400);
        }
        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist($task);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        return new JsonResponse($task);
    }
}
